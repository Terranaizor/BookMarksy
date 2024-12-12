from rest_framework import serializers
from django.contrib.auth.models import User
from user.models import Profile
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from books.serializers import BookEditionListSerializer

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
        Profile.objects.create(user=user, picture="images/default-user.jpg")
        return user
    

class ProfileListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Profile
        fields = ['picture', 'username', 'nickname', 'url']



class ProfileOwnerSerializer(serializers.ModelSerializer):
    friends = ProfileListSerializer(many=True)
    picture = serializers.ImageField(max_length=None, use_url=True)
    savedBookEditions = BookEditionListSerializer(many=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = ['friends', 'picture', 'savedBookEditions', 'username', 'nickname', 'email']
    
class ProfilePublicSerializer(serializers.ModelSerializer):
    # friends = ProfileListSerializer(many=True)
    picture = serializers.ImageField(max_length=None, use_url=True)
    # savedBookEditions = BookEditionListSerializer(many=True)
    username = serializers.CharField(source='user.username', read_only=True)
    # email = serializers.CharField(source='user.email', read_only=True)
    # is_friend = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['picture', 'username', 'nickname']  

    # def get_is_friend(self, obj):
    #     user = self.context.get('request').user
    #     if user.is_authenticated and obj in user.profile.friends.all():
    #         return True
    #     return False


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']