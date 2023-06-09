from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
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
    return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomerRegisterAV(generics.CreateAPIView):
    serializer_class = serializers.CustomerAuthSerializer
    queryset = Customer.objects.all()
    parser_classes = [FormParser, MultiPartParser]

class ArtistRegisterAV(generics.CreateAPIView):
    serializer_class = serializers.ArtistAuthSerializer
    queryset = Artist.objects.all()
    parser_classes = [FormParser, MultiPartParser]


class ArtistListAV(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = serializers.ArtistSerializer
    
class ArtistDetailAV(generics.RetrieveAPIView):
    queryset = Artist.objects.all()
    serializer_class = serializers.ArtistSerializer