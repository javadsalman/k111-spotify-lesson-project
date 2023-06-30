from rest_framework import serializers
from .models import Genre, Song, Playlist
from user.models import Artist

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        exclude = ['updated', 'created']
        
class SongSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'image', 'title']


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