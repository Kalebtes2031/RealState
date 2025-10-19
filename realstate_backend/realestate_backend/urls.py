#realstate_backend/realestate_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

     # Users, authentication, JWT, registration
    path('api/auth/', include('dj_rest_auth.urls')),  # login, logout, password change/reset
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),  # signup

    # Djoser endpoints (optional, if you want extra user management)
    path('api/djoser/', include('djoser.urls')),  
    path('api/djoser/', include('djoser.urls.jwt')),  # JWT token endpoints

    # Allauth social login (Google)
    path('api/auth/social/', include('allauth.socialaccount.urls')),

    # Apps
    path('api/', include('users.urls')),
    path('api/properties/', include('properties.urls')),
    path('api/galleries/', include('galleries.urls')),
    path('api/reviews/', include('reviews.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
