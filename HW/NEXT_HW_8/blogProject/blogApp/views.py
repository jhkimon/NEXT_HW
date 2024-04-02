from django.shortcuts import render, redirect
from .models import Article
from django.contrib import messages

category_names = {
    'hobby': '취미',
    'food': '음식',
    'programming': '프로그래밍'
}

# Create your views here.
def new(request):
    # Counts
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()

    if request.method == "POST":
        print(request.POST)

        new_article = Article.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            category = request.POST['category']
        )

        return redirect('list')
    return render(request, 'new.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
    })

def list(request):
    # Counts
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()

    # Article
    article = Article.objects.order_by('id').last()
    category_kr = category_names[article.category]

    # Pagination
    after_article = Article.objects.filter(id__gt=article.id).order_by('id').first()
    before_article = Article.objects.filter(id__lt=article.id).order_by('id').last()
    total_article = Article.objects.all().order_by('-id')[:5]
    
    return render(request, 'main.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
        'article': article,
        'category_kr': category_kr,
        'after_article_id': after_article.id if after_article else None,
        'before_article_id': before_article.id if before_article else None,
        'total_article': total_article
        })

def detail(request, article_id):
    # Counts
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()

    # Article
    article =  Article.objects.get(pk = article_id)
    category_kr = category_names[article.category]

    # Pagination
    after_article = Article.objects.filter(id__gt=article_id).order_by('id').first()
    before_article = Article.objects.filter(id__lt=article_id).order_by('id').last()
    total_article = Article.objects.all().order_by('-id')[:5]
    
    return render(request, 'main.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
        'article': article,
        'category_kr': category_kr,
        'after_article_id': after_article.id if after_article else None,
        'before_article_id': before_article.id if before_article else None,
        'total_article': total_article
        })

def category(request, category):
    # Counts
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()
    category_cnt = Article.objects.filter(category=category).count()
    if category_cnt == 0:
        return render(request, 'category.html', {
            'category_cnt': category_cnt
        })
    else:
        # Article
        article = Article.objects.filter(category=category).order_by('id').last()
        category_kr = category_names[article.category]

        # Pagination
        after_article = Article.objects.filter(category=category, id__gt=article.id).order_by('id').first()
        before_article = Article.objects.filter(category=category, id__lt=article.id).order_by('id').last()
        total_article = Article.objects.filter(category=category).all().order_by('-id')[:5]
    
        return render(request, 'category.html', {
            'category': category,
            'article_cnt': article_cnt,
            'hobby_cnt': hobby_cnt,
            'food_cnt': food_cnt,
            'programming_cnt': programming_cnt,
            'category_cnt': category_cnt,
            'article': article,
            'category_kr': category_kr,
            'after_article_id': after_article.id if after_article else None,
            'before_article_id': before_article.id if before_article else None,
            'total_article': total_article
            })
    
def detail_category(request, category, article_id):
    # Counts
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()
    category_cnt = Article.objects.filter(category=category).count()

    # Article
    article = Article.objects.get(pk = article_id)
    category_kr = category_names[category]

    # Pagination
    after_article = Article.objects.filter(category=category, id__gt=article_id).order_by('id').first()
    before_article = Article.objects.filter(category=category, id__lt=article_id).order_by('id').last()
    total_article = Article.objects.filter(category=category).all().order_by('-id')[:5]
    
    return render(request, 'category.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
        'category_cnt': category_cnt,
        'article': article,
        'category_kr': category_kr,
        'after_article_id': after_article.id if after_article else None,
        'before_article_id': before_article.id if before_article else None,
        'total_article': total_article
        })