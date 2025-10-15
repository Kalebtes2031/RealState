from rest_framework import generics, permissions
from .models import Property
from .serializers import PropertySerializer

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Automatically attach the agent linked to current user
        user = self.request.user
        if hasattr(user, 'agent_profile'):
            serializer.save(agent=user.agent_profile)
        else:
            raise PermissionError("Only agents can create properties")


class PropertyDetailView(generics.RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]
