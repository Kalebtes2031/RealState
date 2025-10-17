from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Property
from .serializers import PropertyListSerializer, PropertyDetailSerializer
from users.permissions import IsAgent
from rest_framework.response import Response


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