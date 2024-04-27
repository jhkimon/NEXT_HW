from django.db import models
from django.conf import settings
from django.utils import timezone

class Article(models.Model):
    title = models.CharField(max_length = 200)
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="articles", default=1
    )
    content = models.TextField()
    category = models.CharField(max_length = 20, default='others')
    write_time = models.DateTimeField(default=timezone.now)
    last_viewed_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    last_viewed_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
    
    def comment_count(self):
        return self.comments.filter(is_deleted=False).count()

class Comment(models.Model):
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments", default=1
    )
    content = models.TextField()
    write_time = models.DateTimeField(default=timezone.now)
    is_deleted = models.BooleanField(default=False)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name= 'comments')

    def __str__(self):
        return self.content

class Reply(models.Model):
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="replies", default=1
    )
    content = models.TextField()
    write_time = models.DateTimeField(default=timezone.now)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name= 'replies')

    def __str__(self):
        return self.content