from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name='friends')
    picture = models.ImageField(upload_to='images/')
    last_activity = models.DateTimeField(null=True)

