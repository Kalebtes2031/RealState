from rest_framework import serializers
from .models import Property


class PropertyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id','name','address','type','price','created_at']


class PropertyDetailSerializer(serializers.ModelSerializer):
    agent = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = '__all__'

    def get_agent(self, obj):
        return {
            'id': obj.agent.id,
            'display_name': obj.agent.user.display_name,
            'email': obj.agent.user.email,
        }