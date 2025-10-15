from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import Agent
from .serializers import UserSerializer, AgentSerializer


class CurrentUserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        data = self.get_serializer(user).data

        # If user has an agent profile, include it
        if hasattr(user, "agent_profile"):
            data["agent"] = AgentSerializer(user.agent_profile).data
        else:
            data["agent"] = None

        return Response(data)
