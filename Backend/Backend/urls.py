from django.urls import include, path

urlpatterns = [
     path('', include('Users.urls')),
]
