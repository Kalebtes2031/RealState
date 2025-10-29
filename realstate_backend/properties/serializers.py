#realstate_backend/properties/serializers.py
from rest_framework import serializers
from .models import Property
from galleries.serializers import GallerySerializer
from reviews.serializers import ReviewSerializer


class PropertyListSerializer(serializers.ModelSerializer):
    galleries = GallerySerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Property
        fields = ['id','name','address','type', 'category','price','bedrooms','bathrooms', 'galleries', 'reviews', 'created_at']


class PropertyDetailSerializer(serializers.ModelSerializer):
    agent = serializers.SerializerMethodField()
    galleries = GallerySerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = '__all__'

    def get_agent(self, obj):
        return {
            'id': obj.agent.id,
            'display_name': obj.agent.user.display_name,
            'email': obj.agent.user.email,
        }