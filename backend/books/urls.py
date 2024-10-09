from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from books.views import *


urlpatterns = [
    path('catalogue/links/', CatalogueLinksView.as_view(), name='catalogue-links'),
    path('books/new/', NewBooksView.as_view(), name='new-books'),
    path('books/popular/', PopularBooksView.as_view(), name='popular-books'),
    path('books/filtered/', FilteredBooksView.as_view(), name='filtered-books'),
    path('books/<int:pk>/', BookDetailsView.as_view(), name='book-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
