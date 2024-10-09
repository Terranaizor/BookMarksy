from rest_framework import serializers
from books.models import Book

class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'cover', 'rating']

class BookDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'genre', 'cover', 'releaseDate', 'numberPages', 'rating']