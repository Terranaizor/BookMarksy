from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework import generics
from books.models import Book
from books.serializers import *
from rest_framework.pagination import PageNumberPagination
from django.urls import reverse
from django.db.models import Max, Subquery, OuterRef, F

class BooksLinksView(APIView):
    def get(self, request, *args, **kwargs):
        response_data = {
            "newBooksUrl": request.build_absolute_uri(reverse('new-books')),
            "popularBooksUrl": request.build_absolute_uri(reverse('popular-books')),
            "catalogueBooksUrl": request.build_absolute_uri(reverse('filtered-bookeditions')),
            "genresListUrl": request.build_absolute_uri(reverse('genres-list')),
            "publishersListUrl": request.build_absolute_uri(reverse('publishers-list')),
        }
        return Response(response_data, status=status.HTTP_200_OK)

class GenreListView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreListSerializer

class PublisherListView(generics.ListAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherListSerializer

class NewBooksView(generics.ListAPIView):
    serializer_class = BookEditionListSerializer

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

    def get_queryset(self):
        queryset = BookEdition.objects.annotate(
            book_readers=F('book__readersWeek'),
            edition_readers=F('readersTotal')
        ).order_by('-book_readers', '-edition_readers')
        search = self.request.query_params.get('search', None)
        genres = self.request.query_params.getlist('genres')
        if genres:
            genre_queries = [Q(book__genres__name__iexact=genre) for genre in genres]
            # genre_filter = genre_queries.pop()
            for query in genre_queries:
                # genre_filter = genre_filter & query 
                queryset = queryset.filter(query).distinct()
        if search:
            queryset = queryset.filter(
                Q(book__title__icontains=search) |
                Q(book__author__icontains=search)
            ).distinct()
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        total_books = queryset.count()
        response = super().list(request, *args, **kwargs)
        
        response.data['total_books'] = total_books
        return response

class BookEditionDetailView(generics.RetrieveAPIView):
    queryset = BookEdition.objects.all()
    serializer_class = BookEditionDetailSerializer

    def get_serializer_context(self):
        return {'request': self.request}