#realstate_backend/users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter