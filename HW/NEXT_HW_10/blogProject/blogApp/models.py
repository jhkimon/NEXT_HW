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
    
    def comment_count(self):
        return self.comments.filter(is_deleted=False).count()

class Comment(models.Model):
    user = models.CharField(max_length = 20, default="익명")
    content = models.TextField()
    write_time = models.DateTimeField(default=timezone.now)
    is_deleted = models.BooleanField(default=False)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name= 'comments')

    def __str__(self):
        return self.content

class Reply(models.Model):
    user = models.CharField(max_length = 20, default="익명")
    content = models.TextField()
    write_time = models.DateTimeField(default=timezone.now)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name= 'replies')

    def __str__(self):
        return self.content