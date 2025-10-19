#realstate_backend/users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
import json
import base64
from urllib.parse import urlencode, quote_plus, unquote_plus
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from django.conf import settings
import requests


GOOGLE_CLIENT_ID = settings.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = settings.GOOGLE_CLIENT_SECRET
REDIRECT_URI = "https://realstate-backend-38v0.onrender.com/api/auth/callback"  # registered in Google Console


def _encode_state(payload: dict) -> str:
    """Encode a JSON-safe state string (URL-safe base64)."""
    s = json.dumps(payload, separators=(",", ":"))
    return base64.urlsafe_b64encode(s.encode()).decode()


def _decode_state(state_str: str) -> dict:
    try:
        s = base64.urlsafe_b64decode(state_str.encode()).decode()
        return json.loads(s)
    except Exception:
        return {}


def google_authorize(request):
    """
    Accepts `redirect_uri` (client deep link) as a query param, stores it in state,
    then redirects to Google's consent screen with redirect_uri=REDIRECT_URI (your https callback).
    """
    client_redirect = request.GET.get("redirect_uri")  # expected like realstateapp://auth
    if not client_redirect:
        return JsonResponse({"error": "Missing redirect_uri"}, status=400)

    # Build state with client_redirect (and optionally other data)
    state_payload = {"client_redirect": client_redirect}
    state = _encode_state(state_payload)

    params = {
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": REDIRECT_URI,     # must be HTTPS callback URL (registered in Google Console)
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent",
        "state": state,
    }
    auth_url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlencode(params)
    return redirect(auth_url)


def google_callback(request):
    """
    Google redirects here (https callback). Exchange code, create/lookup user,
    create JWT, and then return a small HTML page that redirects client-side to the app scheme.
    """
    code = request.GET.get("code")
    state = request.GET.get("state")
    if not code:
        return JsonResponse({"error": "Missing code"}, status=400)

    # decode our state to find where to send the app at the end
    state_data = _decode_state(state) if state else {}
    client_redirect = state_data.get("client_redirect", "realstateapp://signin")

    # Exchange authorization code for tokens
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
        # Pass through error from Google for easier debugging
        return JsonResponse(token_json, status=400)

    # Get user info
    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {token_json['access_token']}"}
    ).json()

    # Create or get user (adapt to your user model)
    from django.contrib.auth import get_user_model
    User = get_user_model()
    user, _ = User.objects.get_or_create(
        email=user_info["email"],
        defaults={"username": user_info["email"].split("@")[0]},
    )

    # Create JWT tokens (SimpleJWT)
    from rest_framework_simplejwt.tokens import RefreshToken
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    # Build the deep-link with tokens (or just access token). URL-encode values.
    # For security you might prefer to send only a short code and have the app call backend to exchange it.
    deep_link = f"{client_redirect}?token={quote_plus(access_token)}"

    # Instead of server redirect (Django refuses non-HTTPS schemes), return HTML that redirects client-side.
    html = f"""
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Opening app...</title>
        <!-- Meta refresh fallback -->
        <meta http-equiv="refresh" content="0; url={deep_link}">
        <script>
          // Try to open the app
          window.location = "{deep_link}";
          // As a fallback after a delay (if the app isn't installed), show a message.
          setTimeout(function() {{
            document.body.innerHTML = "<p>If nothing happened, please install the app or open it manually.</p><p><a href='{deep_link}'>Open app</a></p>";
          }}, 1500);
        </script>
      </head>
      <body>
        <p>Opening app… If you are not redirected automatically, <a href="{deep_link}">open the app</a>.</p>
      </body>
    </html>
    """
    return HttpResponse(html)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter