from django.db import models
from imagekit.models import ProcessedImageField

# Create your models here.

class Genre(models.Model):
    title = models.CharField(max_length=100)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    
class Playlist(models.Model):
    title = models.CharField(max_length=100)
    customer = models.ForeignKey('user.Customer', on_delete=models.SET_NULL, null=True, blank=True, related_name='playlists')
    image = ProcessedImageField(upload_to='playlist/images/', format='JPEG', options={'quality': 70})
    liked_customers = models.ManyToManyField('user.Customer', related_name='liked_playlists', blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    
class Song(models.Model):
    title = models.CharField(max_length=100)
    genre = models.ForeignKey('Genre', on_delete=models.SET_NULL, null=True, blank=True, related_name='songs')
    description = models.TextField(null=True, blank=True)
    duration = models.IntegerField(default=240)
    image = ProcessedImageField(upload_to='song/images/', format='JPEG', options={'quality': 70})
    file = models.FileField(upload_to='song/files/')
    artists = models.ManyToManyField('user.Artist', related_name='songs')
    playlists = models.ManyToManyField(Playlist, related_name='songs', blank=True)
    liked_customers = models.ManyToManyField('user.Customer', related_name='liked_songs', blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    

