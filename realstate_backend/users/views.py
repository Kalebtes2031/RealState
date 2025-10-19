#realstate_backend/users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
import requests
from django.conf import settings
from django.shortcuts import redirect
from django.http import JsonResponse
from urllib.parse import urlencode

GOOGLE_CLIENT_ID = settings.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = settings.GOOGLE_CLIENT_SECRET
REDIRECT_URI = "https://realstate-backend-38v0.onrender.com/api/auth/callback"  # this will be registered in Google Console

def google_authorize(request):
    """Redirect user to Google's OAuth 2.0 consent screen"""
    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent",
    }
    url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlencode(params)
    return redirect(url)


def google_callback(request):
    code = request.GET.get("code")
    if not code:
        return JsonResponse({"error": "Missing code"}, status=400)

    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    token_response = requests.post(token_url, data=data)
    token_json = token_response.json()

    if "access_token" not in token_json:
        return JsonResponse(token_json, status=400)

    # 🔥 Get user info from Google
    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {token_json['access_token']}"}
    ).json()

    from django.contrib.auth import get_user_model
    User = get_user_model()

    # Create or get user
    user, _ = User.objects.get_or_create(
        email=user_info["email"],
        defaults={"username": user_info["email"].split("@")[0]},
    )

    # 🔥 Create JWT token
    from rest_framework_simplejwt.tokens import RefreshToken
    refresh = RefreshToken.for_user(user)

    # Redirect back to mobile app with your token
    redirect_back = f"realstateapp://auth?token={str(refresh.access_token)}"
    return redirect(redirect_back)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter