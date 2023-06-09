from rest_framework import serializers
from .models import Customer, Artist
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class CustomerAuthSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    user_type = serializers.SerializerMethodField()
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password', write_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    image =  serializers.ImageField(required=False)
    
    class Meta:
        model = Customer
        # fields = ['username', 'password', 'first_name', 'last_name', 'email', 'image', 'token', 'user']
        exclude = ['following_artists']
        
    def create(self, validated_data):
        user = validated_data.pop('user')
        image = validated_data.get('image')
        user = User.objects.create_user(**user)
        customer = Customer.objects.create(user=user, image=image)
        return customer
        
    def get_token(self, instance):
        return Token.objects.get_or_create(user=instance.user)[0].key
    
    def get_user_type(self, instance):
        return 'customer'


class ArtistSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    class Meta:
        model = Artist
        fields = '__all__'
        
class ArtistAuthSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    user_type = serializers.SerializerMethodField()
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    username = serializers.CharField(source='user.username')
    password = serializers.CharField(source='user.password', write_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    image =  serializers.ImageField(required=False)
    
    class Meta:
        model = Artist
        # fields = ['username', 'password', 'first_name', 'last_name', 'email', 'image', 'token', 'user']
        fields = '__all__'
        
    def create(self, validated_data):
        user = validated_data.pop('user')
        image = validated_data.get('image')
        user = User.objects.create_user(**user)
        artist = Artist.objects.create(user=user, image=image)
        return artist
        
    def get_token(self, instance):
        return Token.objects.get_or_create(user=instance.user)[0].key
    
    def get_user_type(self, instance):
        return 'artist'
        