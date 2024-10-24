# Generated by Django 5.1.1 on 2024-10-16 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_genre_publisher_remove_book_genre_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='cover',
        ),
        migrations.AddField(
            model_name='bookedition',
            name='cover',
            field=models.ImageField(default='images/default_cover.jpg', upload_to='images/'),
        ),
        migrations.AddField(
            model_name='bookedition',
            name='readersTotal',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
