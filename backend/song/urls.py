from django.urls import path
from . import views

urlpatterns = [
    path('genres/', views.GenreListAV.as_view(), name='genre-list'),
    path('songs/', views.SongListAV.as_view(), name='song-list'),
    path('songs-summary/', views.SongSummaryListAV.as_view(), name='song-list'),
    path('playlists/', views.PlaylistListAV.as_view(), name='playlist-list'),
    path('playlists/liked/', views.PlaylistLikedListAV.as_view(), name='playlist-liked-list'),
    path('genres/<int:pk>/', views.GenreDetailAV.as_view(), name='genre-detail'),
    path('songs/<int:pk>/', views.SongDetailAV.as_view(), name='song-detail'),
    path('playlists/<int:pk>/', views.PlaylistDetailAV.as_view(), name='playlist-detail'),
    path('playlists/<int:playlist_pk>/add-song/<int:song_pk>/', views.add_song_to_playlist, name='add-song-to-playlist'),
    path('playlists/<int:playlist_pk>/remove-song/<int:song_pk>/', views.remove_song_from_playlist, name='remove-song-from-playlist'),
]
