from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('', views.LikedItemViewSet, basename='likes')

urlpatterns = router.urls
