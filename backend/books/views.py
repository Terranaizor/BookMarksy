from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import renderers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework import generics
from books.models import Book
from books.serializers import BookListSerializer, BookDetailsSerializer
from rest_framework.pagination import PageNumberPagination

class CatalogueLinksView(APIView):
    def get(self, request, *args, **kwargs):
        response_data = {
            "new_books_url": "/api/books/new/",
            "popular_books_url": "/api/books/popular/",
            "catalogue_url": "/api/books/filtered/",
        }
        return Response(response_data, status=status.HTTP_200_OK)

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
