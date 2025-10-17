#realstate_backend/users/urls.py
from django.urls import path
from .views import CurrentUserView, GoogleLogin

urlpatterns = [
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('google/', GoogleLogin.as_view(), name='google-login'),
]
