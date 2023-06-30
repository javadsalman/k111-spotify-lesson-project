from django.db import models
from imagekit.models import ProcessedImageField

# Create your models here.
GENDER_CHOICES = [
    ('man', 'Man'),
    ('woman', 'Woman'),
    ('other', 'Other')
]

class Customer(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.PROTECT)
    image = ProcessedImageField(upload_to='customer/images/', format='JPEG', options={'quality': 70}, null=True, blank=True)
    following_artists = models.ManyToManyField('Artist', related_name='followed_customers')
    birth_date = models.DateField()
    gender = models.CharField(choices=GENDER_CHOICES)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

class Artist(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.PROTECT)
    image = ProcessedImageField(upload_to='artist/images/', format='JPEG', options={'quality': 70}, null=True, blank=True)
    verified = models.BooleanField(default=False)
    birth_date = models.DateField()
    gender = models.CharField(choices=GENDER_CHOICES)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username