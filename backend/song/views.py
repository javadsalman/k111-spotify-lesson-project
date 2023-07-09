from django.shortcuts import render, get_object_or_404
from rest_framework import generics, parsers, pagination, status, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import GenreSerializer, SongSummarySerializer
from .extended_serializers import SongSerializer, PlaylistSerializer, HistorySerializer
from .models import Genre, Song, Playlist, ListenHistory
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
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['artists']
    search_fields = ['title', 'artists__user__first_name', 'artists__user__last_name', 'genre__title']
    pagination_class = pagination.LimitOffsetPagination
    
    
    
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
    parser_classes = [parsers.JSONParser, parsers.MultiPartParser, parsers.FormParser]
    pagination_class = pagination.LimitOffsetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'customer']
    
class PlaylistLikedListAV(PlaylistListAV):
    def get_queryset(self):
        return self.request.user.customer.liked_playlists.all()


class PlaylistDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    parser_classes = [parsers.JSONParser, parsers.MultiPartParser, parsers.FormParser]
    

@api_view(['PUT'])
def add_song_to_playlist(request, playlist_pk, song_pk):
    playlist = get_object_or_404(Playlist, pk=playlist_pk)
    if playlist.customer != request.user.customer:
        return Response(status=status.HTTP_403_FORBIDDEN)
    song = get_object_or_404(Song, pk=song_pk)
    playlist.songs.add(song)
    serializer = SongSerializer(song)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['PUT'])
def remove_song_from_playlist(request, playlist_pk, song_pk):
    playlist = get_object_or_404(Playlist, pk=playlist_pk)
    if playlist.customer != request.user.customer:
        return Response(status=status.HTTP_403_FORBIDDEN)
    song = get_object_or_404(Song, pk=song_pk)
    playlist.songs.remove(song)
    return Response(status=status.HTTP_202_ACCEPTED)
    
    
class HistoryListAV(generics.ListAPIView):
    def get_queryset(self):
        return self.user.customer.listen_histories.all()