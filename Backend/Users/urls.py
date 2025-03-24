from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'users', views.UserViewSet,basename='user')

urlpatterns = [
    path('api/', include(router.urls)),
]