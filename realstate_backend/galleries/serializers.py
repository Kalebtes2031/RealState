from rest_framework import serializers
from .models import Gallery
from django.conf import settings

class GallerySerializer(serializers.ModelSerializer):
    image= serializers.SerializerMethodField()
    
    class Meta:
        model = Gallery
        fields = ['id', 'property', 'image', 'created_at']
        
    def get_image(self, obj):
        # Always use IP-based base URL
        base_url = getattr(settings, "SITE_URL", "")
        if obj.image:
            return f"{base_url}{obj.image.url}"
        return None
