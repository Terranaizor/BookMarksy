from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from books.views import *


urlpatterns = [
    path('index/', BooksLinksView.as_view(), name='index'),
    path('books/new/', NewBooksView.as_view(), name='new-books'),
    path('books/popular/', PopularBooksView.as_view(), name='popular-books'),
    path('books/filtered/', FilteredBookEditionsView.as_view(), name='filtered-bookeditions'),
    path('books/<int:pk>/', BookEditionDetailView.as_view(), name='bookedition-detail'),
    path('books/genres/', GenreListView.as_view(), name='genres-list'),
    path('books/publishers/', PublisherListView.as_view(), name='publishers-list'),
    path('books/filter_parameters/', FilterParametersView.as_view(), name='filter-parameters'),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)
