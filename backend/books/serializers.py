from rest_framework import serializers
from books.models import *

class BookListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'rating', 'url']

class GenreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']
    
    # def to_representation(self, instance):
    #     return {'Genre': [instance.name]}
class PublisherListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['name']

    # def to_representation(self, instance):
    #     return instance.name  # Only return the genre name



class BookEditionListSerializer(serializers.HyperlinkedModelSerializer):
    publisher = serializers.CharField(source='publisher.name', read_only=True)
    title = serializers.CharField(source='book.title', read_only=True)
    author = serializers.CharField(source='book.author', read_only=True)
    rating = serializers.FloatField(source='book.rating', read_only=True)
    class Meta:
        model = BookEdition
        fields = ['title', 'author', 'rating', 'cover', 'url', 'publisher']

class BookEditionDetailSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='book.title', read_only=True)
    author = serializers.CharField(source='book.author', read_only=True)
    description = serializers.CharField(source='book.description', read_only=True)
    genres = GenreListSerializer(source='book.genres', many=True, read_only=True)
    releaseDate = serializers.DateField(source='book.releaseDate', read_only=True)
    rating = serializers.FloatField(source='book.rating', read_only=True)

    publisher = serializers.CharField(source='publisher.name', read_only=True)

    editions = serializers.SerializerMethodField()

    class Meta:
        model = BookEdition
        fields = ['title', 'author', 'description', 'genres', 'releaseDate', 'rating', 'editions', 'publisher', 'numberPages', 'cover']
    
    def get_editions(self, obj):
        editions = BookEdition.objects.filter(book=obj.book).exclude(id=obj.id)
        request = self.context.get('request')
        return BookEditionListSerializer(editions, many=True, context={'request': request}).data


class BookDetailsSerializer(serializers.ModelSerializer):
    genres = GenreListSerializer(many=True)
    editions = BookEditionListSerializer(many=True)
    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'genres', 'releaseDate', 'rating', 'editions']