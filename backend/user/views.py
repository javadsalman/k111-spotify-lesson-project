from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.filters import SearchFilter
from django.contrib.auth import authenticate
from . import serializers
from .models import Customer, Artist

# Create your views here.

@api_view(['POST'])
def customer_login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        serializer = serializers.CustomerAuthSerializer(instance=user.customer)
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def artist_login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        serializer = serializers.ArtistAuthSerializer(instance=user.artist)
        return Response(serializer.data)
    return Response({'detail': 'Username or Password is wrong!'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class CustomerRegisterAV(generics.CreateAPIView):
    serializer_class = serializers.CustomerAuthSerializer
    queryset = Customer.objects.all()
    parser_classes = [FormParser, MultiPartParser]

class ArtistRegisterAV(generics.CreateAPIView):
    serializer_class = serializers.ArtistAuthSerializer
    queryset = Artist.objects.all()
    parser_classes = [FormParser, MultiPartParser]
    
class ArtistAuthDetailAV(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.ArtistAuthSerializer
    queryset = Artist.objects.all()
    parser_classes = [FormParser, MultiPartParser, JSONParser]


class ArtistListAV(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = serializers.ArtistSerializer
    filter_backends = [SearchFilter]
    search_fields = ['user__username', 'user__first_name', 'user__last_name']
    
class ArtistDetailAV(generics.RetrieveAPIView):
    queryset = Artist.objects.all()
    serializer_class = serializers.ArtistSerializer