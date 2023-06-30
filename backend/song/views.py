from django.shortcuts import render, get_object_or_404
from rest_framework import generics, parsers
from .serializers import GenreSerializer, SongSummarySerializer, PlaylistSerializer
from .extended_serializers import SongSerializer
from .models import Genre, Song, Playlist
from .permissions import SongPermission
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.


class GenreListAV(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class GenreDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    


class SongListAV(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = [SongPermission]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['artists']
    
class SongSummaryListAV(SongListAV):
    serializer_class = SongSummarySerializer

class SongDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = [SongPermission]

class PlaylistListAV(generics.ListCreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]


class PlaylistDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    