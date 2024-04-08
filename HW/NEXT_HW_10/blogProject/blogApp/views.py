from django.shortcuts import render, redirect
from .models import *
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
    total_article = Article.objects.all().order_by('-id')
    part_article = None
    for idx in range(article_cnt // 5 + 1):
        part_article = total_article[(idx*5):(idx*5)+5]
        if article in part_article:
            break

    if request.method == "POST":
        if "comment" in request.POST:
            content = request.POST['content']
            user = request.POST['user']

            new_comment = Comment.objects.create(
                article=article,
                content=content,
                user=user
            )

        elif "reply" in request.POST:
            comment_id = request.POST['comment_id']
            comment = Comment.objects.get(pk=comment_id)
            content = request.POST['content']
            user = request.POST['user']

            new_reply = Reply.objects.create(
                comment=comment,
                content=content,
                user=user
            )

        return redirect('list')
    
    return render(request, 'main.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
        'article': article,
        'category_kr': category_kr,
        'after_article_id': after_article.id if after_article else None,
        'before_article_id': before_article.id if before_article else None,
        'total_article': part_article
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
    total_article = Article.objects.all().order_by('-id')
    part_article = None
    for idx in range(article_cnt // 5 + 1):
        part_article = total_article[(idx*5):(idx*5)+5]
        if article in part_article:
            break

    if request.method == "POST":
        if "comment" in request.POST:
            content = request.POST['content']
            user = request.POST['user']

            new_comment = Comment.objects.create(
                article=article,
                content=content,
                user=user
           )

        elif "reply" in request.POST:
            comment_id = request.POST['comment_id']
            comment = Comment.objects.get(pk=comment_id)
            content = request.POST['content']
            user = request.POST['user']

            new_reply = Reply.objects.create(
                comment=comment,
                content=content,
                user=user
            )

        return redirect('detail', article_id)    
    
    return render(request, 'main.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
        'article': article,
        'category_kr': category_kr,
        'after_article_id': after_article.id if after_article else None,
        'before_article_id': before_article.id if before_article else None,
        'total_article': part_article
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
        total_article = Article.objects.all().filter(category=category).order_by('-id')
        part_article = None
        for idx in range(category_cnt // 5 + 1):
            part_article = total_article[(idx*5):(idx*5)+5]
            if article in part_article:
                break
    
        if request.method == "POST":
            if "comment" in request.POST:
                content = request.POST['content']
                user = request.POST['user']

                new_comment = Comment.objects.create(
                    article=article,
                    content=content,
                    user=user
                )

            elif "reply" in request.POST:
                comment_id = request.POST['comment_id']
                comment = Comment.objects.get(pk=comment_id)
                content = request.POST['content']
                user = request.POST['user']

                new_reply = Reply.objects.create(
                    comment=comment,
                    content=content,
                    user=user
                )

            return redirect('category', category)  
         
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
            'total_article': part_article
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
    total_article = Article.objects.filter(category=category).all().order_by('-id')
    part_article = None
    for idx in range(category_cnt // 5 + 1):
        part_article = total_article[(idx*5):(idx*5)+5]
        if article in part_article:
            break

    if request.method == "POST":
        if "comment" in request.POST:
            content = request.POST['content']
            user = request.POST['user']

            new_comment = Comment.objects.create(
                article=article,
                content=content,
                user=user
            )

        elif "reply" in request.POST:
            comment_id = request.POST['comment_id']
            comment = Comment.objects.get(pk=comment_id)
            content = request.POST['content']
            user = request.POST['user']

            new_reply = Reply.objects.create(
                comment=comment,
                content=content,
                user=user
            )

        return redirect('detail_category', category, article_id)
    
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
        'total_article': part_article
        })

def delete_reply(request, article_pk, comment_pk, reply_pk):
    reply = Reply.objects.get(pk = reply_pk)
    reply.delete()

    reply_cnt = Reply.objects.filter(comment_id=comment_pk).count()

    if reply_cnt == 0:
        comment = Comment.objects.get(pk=comment_pk)
        comment.delete()
        
    return redirect('detail', article_pk)

def delete_comment(request, article_pk, comment_pk):
    comment = Comment.objects.get(pk=comment_pk)
    reply_cnt = Reply.objects.filter(comment=comment).count()

    if reply_cnt > 0:
        comment.content = '삭제된 댓글입니다.'
        comment.save()
    else:
        comment.delete()

    return redirect('detail', article_id=article_pk)
