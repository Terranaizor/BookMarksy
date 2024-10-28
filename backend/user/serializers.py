from rest_framework import serializers
from django.contrib.auth.models import User
from user.models import Profile
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=get_user_model().objects.all())]
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=get_user_model().objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password',]
        extra_kwargs = {
            'password' : {'write_only': True},
        }

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        Profile.objects.create(user=user, image="images/default-user.jpg")
        return user
    
class ProfileSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    picture = serializers.ImageField(max_length=None, use_url=True)
    savedBookEditions = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['friends', 'picture', 'savedBookEditions']
    
    def get_friends(self, obj):
        

class FriendsListSerializer(serializers.ModelSerializer):
       


class UserSerializer(serializers.ModelSerializer):
    