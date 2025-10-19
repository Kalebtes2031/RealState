#realstate_backend/users/urls.py
from django.urls import path
from .views import CurrentUserView, GoogleLogin, google_authorize, google_callback

urlpatterns = [
    path("auth/authorize/", google_authorize, name="google_authorize"),
    path("auth/callback/", google_callback, name="google_callback"),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('google/', GoogleLogin.as_view(), name='google-login'),
]
