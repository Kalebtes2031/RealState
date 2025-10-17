#realstate_backend/reviews/urls.py

from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet


router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')


urlpatterns = router.urls