from django.urls import path
from . import views

urlpatterns = [
    path('genres/', views.GenreListAV.as_view(), name='genre-list'),
    path('songs/', views.SongListAV.as_view(), name='song-list'),
    path('playlists/', views.PlaylistListAV.as_view(), name='playlist-list'),
    path('genres/<int:pk>/', views.GenreDetailAV.as_view(), name='genre-detail'),
    path('songs/<int:pk>/', views.SongDetailAV.as_view(), name='song-detail'),
    path('playlists/<int:pk>/', views.PlaylistDetailAV.as_view(), name='playlist-detail'),
]
