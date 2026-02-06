from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('', views.TagViewset, basename='tag')
router.register('items', views.TaggedItemViewSet, basename='tagged-item')

urlpatterns = router.urls