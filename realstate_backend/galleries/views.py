from rest_framework import generics, permissions
from .models import Gallery
from .serializers import GallerySerializer

class GalleryListCreateView(generics.ListCreateAPIView):
    queryset = Gallery.objects.all().order_by('-created_at')
    serializer_class = GallerySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
