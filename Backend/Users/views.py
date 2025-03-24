from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
def Login_User(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({
            'message': 'Email and password are required'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = authenticate(username=email, password=password)
        if user is not None:
            serializer = UserSerializer(user)
            return Response({
                'message': 'Login successful',
                'user': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)