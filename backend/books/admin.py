from django.contrib import admin
from books.models import *
# Register your models here.
admin.site.register(Book)
admin.site.register(Genre)
admin.site.register(Publisher)
admin.site.register(BookEdition)