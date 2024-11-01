from django.db import models
from django.utils import timezone

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length = 200)
    content = models.TextField()
    category = models.CharField(max_length = 20, default='others')
    write_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
    