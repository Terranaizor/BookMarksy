from django.db import models
from django.contrib.auth.models import User
from books.models import BookEdition

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name='friends')
    picture = models.ImageField(upload_to='images/', default='images/default-user.jpg')
    last_activity = models.DateTimeField(null=True)
    savedBookEditions = models.ManyToManyField(BookEdition)
    nickname = models.CharField(default="", max_length=256)
