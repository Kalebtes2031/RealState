#realstate_backend/galleries/views.py
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Gallery, Property
from .serializers import GallerySerializer
from users.permissions import IsAgent


# Create Gallery
class GalleryCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAgent]

    def post(self, request):
        serializer = GallerySerializer(data=request.data)
        if serializer.is_valid():
            # Optional: ensure the property belongs to the agent
            property_obj = get_object_or_404(Property, pk=request.data.get('property'))
            if property_obj.agent.user != request.user:
                return Response({'detail': 'Cannot add gallery to another agent’s property'}, status=403)
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# List or Retrieve Gallery
class GalleryDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        gallery = get_object_or_404(Gallery, pk=pk)
        serializer = GallerySerializer(gallery)
        return Response(serializer.data)

# Update Gallery (partial/full)
class GalleryUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsAgent]

    def put(self, request, pk):
        return self._update(request, pk, partial=False)

    def patch(self, request, pk):
        return self._update(request, pk, partial=True)

    def _update(self, request, pk, partial):
        gallery = get_object_or_404(Gallery, pk=pk)
        if gallery.property.agent.user != request.user:
            return Response({'detail': 'Not allowed'}, status=403)
        serializer = GallerySerializer(gallery, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# Delete Gallery
class GalleryDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAgent]

    def delete(self, request, pk):
        gallery = get_object_or_404(Gallery, pk=pk)
        if gallery.property.agent.user != request.user:
            return Response({'detail': 'Not allowed'}, status=403)
        gallery.delete()
        return Response({'detail': 'Gallery deleted'}, status=204)
      

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all().order_by('-created_at')
    serializer_class = GallerySerializer


    def get_permissions(self):
        if self.action in ['create','update','partial_update','destroy']:
          return [IsAuthenticated(), IsAgent()]
        return [AllowAny()]


    def perform_create(self, serializer):
    # Optionally ensure uploaded gallery.property belongs to agent
        serializer.save()