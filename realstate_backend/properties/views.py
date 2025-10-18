#realstate_backend/properties/views.py
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Property
from .serializers import PropertyListSerializer, PropertyDetailSerializer
from users.permissions import IsAgent
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.parsers import JSONParser

# List all properties
class PropertyListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        properties = Property.objects.all().order_by('-created_at')
        serializer = PropertyListSerializer(properties, many=True)
        return Response(serializer.data)


# Create a new property (agent only)
class PropertyCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAgent]

    def post(self, request):
        serializer = PropertyDetailSerializer(data=request.data)
        if serializer.is_valid():
            agent = request.user.agent_profile
            serializer.save(agent=agent)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Retrieve a property by ID
class PropertyDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        property_obj = get_object_or_404(Property, pk=pk)
        serializer = PropertyDetailSerializer(property_obj)
        return Response(serializer.data)


# Update a property (agent only, must be owner)
class PropertyUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsAgent]
    parser_classes = [JSONParser]

    def put(self, request, pk):
        """Full update (replace all fields)"""
        return self._update(request, pk, partial=False)

    def patch(self, request, pk):
        """Partial update (update only provided fields)"""
        return self._update(request, pk, partial=True)

    def _update(self, request, pk, partial):
        property_obj = get_object_or_404(Property, pk=pk)

        # Only the owner agent can update
        if property_obj.agent.user != request.user:
            return Response({'detail': 'Not allowed'}, status=403)

        serializer = PropertyDetailSerializer(property_obj, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# Delete a property (agent only, must be owner)
class PropertyDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAgent]

    def delete(self, request, pk):
        property_obj = get_object_or_404(Property, pk=pk)
        if property_obj.agent.user != request.user:
            return Response({'detail': 'Not allowed'}, status=status.HTTP_403_FORBIDDEN)
        property_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-created_at')
    filterset_fields = ['type']
    search_fields = ['name', 'address', 'type']


    def get_serializer_class(self):
        if self.action in ['retrieve']:
            return PropertyDetailSerializer
        return PropertyListSerializer

    def get_permissions(self):
        if self.action in ['create','update','partial_update','destroy']:
            return [IsAuthenticated(), IsAgent()]
        return [AllowAny()]


    def perform_create(self, serializer):
        # link agent automatically from request.user.agent_profile
        agent = self.request.user.agent_profile
        serializer.save(agent=agent)


    @action(detail=False, methods=['get'], url_path='latest')
    def latest(self, request):
        limit = int(request.query_params.get('limit', 5))
        props = self.queryset[:limit]
        serializer = PropertyListSerializer(props, many=True)
        return Response(serializer.data)