# Generated by Django 4.2.1 on 2023-06-14 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_artist_user_alter_customer_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='verified',
            field=models.BooleanField(default=False),
        ),
    ]
