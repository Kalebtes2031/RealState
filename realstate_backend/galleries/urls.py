#realstate_backend/galleries/urls.py
from django.urls import path
from .views import (
    GalleryCreateView,
    GalleryDetailView,
    GalleryUpdateView,
    GalleryDeleteView,
)

urlpatterns = [
    path('', GalleryCreateView.as_view(), name='gallery-create'),
    path('<int:pk>/', GalleryDetailView.as_view(), name='gallery-detail'),
    path('<int:pk>/update/', GalleryUpdateView.as_view(), name='gallery-update'),
    path('<int:pk>/delete/', GalleryDeleteView.as_view(), name='gallery-delete'),
]
