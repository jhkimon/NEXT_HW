from django.shortcuts import render, redirect
from .models import Article

# Create your views here.
def new(request):
    if request.method == "POST":
        print(request.POST)

        new_article = Article.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            category = request.POST['category']
        )

        return redirect('list')
    return render(request, 'new.html')

def list(request):
    articles = Article.objects.all()
    return render(request, 'list.html', {'articles': articles})

def detail(request, article_id):
    article = Article.objects.get(pk = article_id)
    return render(request, 'detail.html', {'article' : article})

def category(request, category):
    category_names = {
        'hobby': '취미',
        'food': '음식',
        'programming': '프로그래밍'
    }
    articles = Article.objects.filter(category = category)
    article_cnt = len(articles)
    return render(request, 'category.html', {
        'articles': articles,
        'article_cnt': article_cnt,
        'category': category_names[category]
        })