from rest_framework import serializers
from .models import Genre, Song, Playlist, ListenHistory
from user.models import Artist

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        exclude = ['updated', 'created']
        
class SongSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'image', 'title']


