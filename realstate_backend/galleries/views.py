from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Gallery
from .serializers import GallerySerializer
from users.permissions import IsAgent


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