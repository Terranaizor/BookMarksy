from rest_framework import serializers
from books.models import *

class BookListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'cover', 'rating', 'url']

class GenreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']

class PublisherListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['name']

class BookEditionSerializer(serializers.ModelSerializer):
    publisher = PublisherListSerializer()

    class Meta:
        model = BookEdition
        fields = ['publisher', 'number_pages']

class BookDetailsSerializer(serializers.ModelSerializer):
    genres = GenreListSerializer(many=True)
    editions = BookEditionSerializer(many=True)
    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'genres', 'cover', 'releaseDate', 'rating', 'editions']