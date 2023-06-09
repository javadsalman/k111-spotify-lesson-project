from rest_framework import serializers
from .models import Genre, Song, Playlist
from user.models import Artist

class ArtistSummary(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name')
    class Meta:
        model = Artist
        fields = ['id', 'full_name']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
        

class SongSerializer(serializers.ModelSerializer):
    genre_info = GenreSerializer(source='genre', read_only=True)
    artists_info = ArtistSummary(source='artists', many=True, read_only=True)
    like_count = serializers.IntegerField(source='liked_customers.count', read_only=True)
    artists = serializers.JSONField(write_only=True)
    
    class Meta:
        model = Song
        fields = '__all__'
        extra_kwargs = {
            'genre': {'write_only': True}
        }



class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'
        extra_kwargs = {
            'customer': {'read_only': True},
            'liked_customers': {'read_only': True}
        }
        
    def create(self, validated_data):
        return Playlist.objects.create(customer=self.context['request'].user.customer, **validated_data)