from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.CharField(max_length=255)
    cover = models.ImageField(upload_to='images/')
    readersTotal = models.PositiveIntegerField(default=0)
    readersWeek = models.PositiveIntegerField(default=0)
    releaseDate = models.DateTimeField()
    rating = models.FloatField(default = 0)

    def __str__(self):
        return self.title


class Publisher(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class BookEdition(models.Model):
    book = models.ForeignKey(Book, related_name='editions', on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    number_pages = models.IntegerField()

    def __str__(self):
        return f"{self.book.title} - {self.publisher.name} Edition"