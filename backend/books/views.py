from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework import generics, permissions
from books.models import Book
from books.serializers import *
from rest_framework.pagination import PageNumberPagination
from django.urls import reverse
from django.db.models import Max, Subquery, OuterRef, F

class BooksLinksView(APIView):
    permission_class = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        response_data = {
            "newBooksUrl": request.build_absolute_uri(reverse('new-books')),
            "popularBooksUrl": request.build_absolute_uri(reverse('popular-books')),
            "catalogueBooksUrl": request.build_absolute_uri(reverse('filtered-bookeditions')),
            "genresListUrl": request.build_absolute_uri(reverse('genres-list')),
            "publishersListUrl": request.build_absolute_uri(reverse('publishers-list')),
            "filterParametersUrl": request.build_absolute_uri(reverse('filter-parameters')),
        }
        return Response(response_data, status=status.HTTP_200_OK)

class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreListSerializer
    permission_class = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        genre_names = [genre['name'] for genre in response.data]
        genre_data = {'data': genre_names, 'type': 'checkbox'}
        
        return Response({'Genres': genre_data})

class PublisherListView(generics.ListAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherListSerializer
    permission_class = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        publisher_names = [publisher['name'] for publisher in response.data]
        publisher_data = {'data': publisher_names, 'type': 'radio'}

        return Response({'Publishers': publisher_data})

class FilterParametersView(APIView):
    permission_class = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        genre_view = GenreListView.as_view()(request._request)
        publisher_view = PublisherListView.as_view()(request._request)
        
        genres_data = genre_view.data
        publishers_data = publisher_view.data

        return Response({
            'Genres': genres_data['Genres'],
            'Publishers': publishers_data['Publishers']
        })

class NewBooksView(generics.ListAPIView):
    serializer_class = BookEditionListSerializer
    permission_class = [permissions.AllowAny]

    def get_queryset(self):
        newest_books = Book.objects.order_by('-releaseDate')[:10]

        most_read_editions = []

        for book in newest_books:
            most_read_edition = BookEdition.objects.filter(book=book).order_by('-readersTotal').first()
            if most_read_edition:
                most_read_editions.append(most_read_edition)

        return most_read_editions

class PopularBooksView(generics.ListAPIView):
    serializer_class = BookEditionListSerializer
    permission_class = [permissions.AllowAny]

    def get_queryset(self):
        most_popular_books = Book.objects.order_by('-readersWeek')[:10]

        most_read_editions = []

        for book in most_popular_books:
            most_read_edition = BookEdition.objects.filter(book=book).order_by('-readersTotal').first()
            if most_read_edition:
                most_read_editions.append(most_read_edition)

        return most_read_editions

class FilteredBookEditionsPagination(PageNumberPagination):
    page_size = 5

class FilteredBookEditionsView(generics.ListAPIView):
    serializer_class = BookEditionListSerializer
    pagination_class = FilteredBookEditionsPagination
    permission_class = [permissions.AllowAny]

    def get_queryset(self):
        queryset = BookEdition.objects.annotate(
            book_readers=F('book__readersWeek'),
            edition_readers=F('readersTotal')
        ).order_by('-book_readers', '-edition_readers')

        search = self.request.query_params.get('search', None)
        genres = self.request.query_params.getlist('genres', [])
        publisher = self.request.query_params.get('publisher', None)

        if genres:
            genre_queries = [Q(book__genres__name__iexact=genre) for genre in genres]
            for query in genre_queries:
                queryset = queryset.filter(query).distinct()

        if publisher:
            publisher_filter = Q(publisher__name__iexact = publisher)
            queryset = queryset.filter(publisher_filter).distinct()

        if search:
            queryset = queryset.filter(
                Q(book__title__icontains=search) |
                Q(book__author__icontains=search)
            ).distinct()

        return queryset
    
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        response.data['book_count_page'] = FilteredBookEditionsPagination.page_size
        return response

class BookEditionDetailView(generics.RetrieveAPIView):
    queryset = BookEdition.objects.all()
    serializer_class = BookEditionDetailSerializer
    permission_class = [permissions.AllowAny]

    def get_serializer_context(self):
        return {'request': self.request}