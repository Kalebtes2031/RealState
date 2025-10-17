from rest_framework.permissions import BasePermission


class IsAgent(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'agent_profile') and request.user.agent_profile is not None