from django.utils import timezone
from functools import wraps
from .models import Article

def update_last_viewed(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        response = func(request, *args, **kwargs)
        article_id = kwargs.get('article_id')
        if article_id and request.user.is_authenticated:
            from .models import Article
            try:
                article = Article.objects.get(id=article_id)
                article.last_viewed_time = timezone.now()
                article.last_viewed_user = request.user
                article.save()
            except Article.DoesNotExist:
                pass
        return response
    return wrapper

