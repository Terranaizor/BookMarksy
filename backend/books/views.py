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

class CatalogueLinksView(APIView):
    def get(self, request, *args, **kwargs):
        response_data = {
            "newBooksUrl": request.build_absolute_uri(reverse('new-books')),
            "popularBooksUrl": request.build_absolute_uri(reverse('popular-books')),
            "catalogueBooksUrl": request.build_absolute_uri(reverse('filtered-books')),
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
    serializer_class = BookListSerializer

    def get_queryset(self):
        return Book.objects.order_by('-releaseDate')[:10]

class PopularBooksView(generics.ListAPIView):
    serializer_class = BookListSerializer

    def get_queryset(self):
        return Book.objects.order_by('-readersWeek')[:10]

class FilteredBooksPagination(PageNumberPagination):
    page_size = 10

class FilteredBooksView(generics.ListAPIView):
    serializer_class = BookListSerializer
    pagination_class = FilteredBooksPagination 

    def get_queryset(self):
        queryset = Book.objects.all()
        search = self.request.query_params.get('search', None)
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(author__icontains=search) |
                Q(genre__icontains=search)
            ).distinct()
        
        return queryset

class BookDetailsView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookDetailsSerializer
