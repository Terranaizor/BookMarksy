from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.views import Response, status
from rest_framework.authtoken.models import Token
from user.serializers import *
from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404

# Create your views here.
class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': str(token), 'user' : UserSerializer(user).data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                return Response({'token': str(token), 'user' : UserSerializer(user).data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListView(generics.ListAPIView):
    permission_class = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    permission_class = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileListView(generics.ListAPIView):
    permission_class = [permissions.IsAdminUser]
    queryset = Profile.objects.all()
    serializer_class = ProfileListSerializer

class ProfileDetailView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()

    def get(self, request, *args, **kwargs):
        profile = get_object_or_404(Profile, id=kwargs['pk'])

        if profile.user == request.user:
            serializer = ProfileOwnerSerializer(profile)
        else:
            serializer = ProfilePublicSerializer(profile)

        return Response(serializer.data)