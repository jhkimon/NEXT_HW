from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth.decorators import login_required
from authApp.permissions import check_is_creator_or_admin
from .blog_decorater import *
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt

category_names = {
    'hobby': '취미',
    'food': '음식',
    'programming': '프로그래밍'
}

@login_required
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
            category = request.POST['category'],
            creator = request.user,
        )

        return redirect('list')
    return render(request, 'new.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
    })

def list(request):
    # Article
    article = Article.objects.order_by('id').last()
    category_kr = category_names[article.category]
    if request.user.is_authenticated:
        user_like = Like.objects.filter(creator=request.user, article=article).exists()
    else:
        user_like = False
    # Counts
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()
    vaild_comment_cnt = article.comments.filter(is_deleted=False).count()

    # Pagination
    after_article = Article.objects.filter(id__gt=article.id).order_by('id').first()
    before_article = Article.objects.filter(id__lt=article.id).order_by('id').last()
    total_article = Article.objects.all().order_by('-id')
    part_article = None
    for idx in range(article_cnt // 5 + 1):
        part_article = total_article[(idx*5):(idx*5)+5]
        if article in part_article:
            break

    if request.user.is_authenticated:
        article.last_viewed_user = request.user
        article.last_viewed_time = timezone.now()
        article.save()

    if request.method == "POST":
        if "comment" in request.POST:
            content = request.POST['content']
            secret = request.POST.get('secret') == 'on'
            new_comment = Comment.objects.create(
                article=article,
                content=content,
                creator=request.user,
                is_secret=secret,
            )

        elif "reply" in request.POST:
            comment_id = request.POST['comment_id']
            comment = Comment.objects.get(pk=comment_id)
            content = request.POST['content']
            secret = request.POST.get('secret') == 'on'

            new_reply = Reply.objects.create(
                comment=comment,
                content=content,
                creator=request.user,
                is_secret=secret,
            )

        return redirect('list')
    
    return render(request, 'main.html', {
        'article_cnt': article_cnt,
        'vaild_comment_cnt': vaild_comment_cnt,
        'article': article,
        'user_like': user_like,
        'category_kr': category_kr if category_kr else None,
        'after_article_id': after_article.id if after_article else None,
        'before_article_id': before_article.id if before_article else None,
        'total_article': part_article,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt
        })

@update_last_viewed
def detail(request, article_id):
    # Article
    article =  Article.objects.get(pk = article_id)
    category_kr = category_names[article.category]
    if request.user.is_authenticated:
        user_like = Like.objects.filter(creator=request.user, article=article).exists()
    else:
        user_like = False
    # Counts
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()
    vaild_comment_cnt = article.comments.filter(is_deleted=False).count()

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
            secret = request.POST.get('secret') == 'on'

            new_comment = Comment.objects.create(
                article=article,
                content=content,
                creator=request.user,
                is_secret = secret
           )

        elif "reply" in request.POST:
            comment_id = request.POST['comment_id']
            comment = Comment.objects.get(pk=comment_id)
            content = request.POST['content']
            secret = request.POST.get('secret') == 'on'
            new_reply = Reply.objects.create(
                comment=comment,
                content=content,
                creator=request.user,
                is_secret = secret
            )

        return redirect('detail', article_id)    
    
    return render(request, 'main.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
        'vaild_comment_cnt': vaild_comment_cnt,
        'article': article,
        'user_like': user_like,
        'category_kr': category_kr if category_kr else None,
        'after_article_id': after_article.id if after_article else None,
        'before_article_id': before_article.id if before_article else None,
        'total_article': part_article
        })

def category(request, category):
    # Article
    article = Article.objects.filter(category=category).order_by('id').last()
    if request.user.is_authenticated:
        user_like = Like.objects.filter(creator=request.user, article=article).exists()
    else:
        user_like = False
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
        vaild_comment_cnt = article.comments.filter(is_deleted=False).count()
        category_kr = category_names[article.category]

        if request.user.is_authenticated:
            article.last_viewed_user = request.user
            article.last_viewed_time = timezone.now()
            article.save()
        
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
                secret = request.POST.get('secret') == 'on'
                new_comment = Comment.objects.create(
                    article=article,
                    content=content,
                    creator=request.user,
                    is_secret = secret
                )

            elif "reply" in request.POST:
                comment_id = request.POST['comment_id']
                comment = Comment.objects.get(pk=comment_id)
                content = request.POST['content']
                secret = request.POST.get('secret') == 'on'
                new_reply = Reply.objects.create(
                    comment=comment,
                    content=content,
                    creator=request.user,
                    is_secret = secret
                )

            return redirect('category', category)  
         
        return render(request, 'category.html', {
            'category': category,
            'article_cnt': article_cnt,
            'hobby_cnt': hobby_cnt,
            'food_cnt': food_cnt,
            'programming_cnt': programming_cnt,
            'vaild_comment_cnt': vaild_comment_cnt,
            'category_cnt': category_cnt,
            'article': article,
            'user_like': user_like,
            'category_kr': category_kr if category_kr else None,
            'after_article_id': after_article.id if after_article else None,
            'before_article_id': before_article.id if before_article else None,
            'total_article': part_article
            })
    
@update_last_viewed    
def detail_category(request, category, article_id):
    # Article
    article = Article.objects.get(pk = article_id)
    category_kr = category_names[category]
    if request.user.is_authenticated:
        user_like = Like.objects.filter(creator=request.user, article=article).exists()
    else:
        user_like = False
    # Counts
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()
    category_cnt = Article.objects.filter(category=category).count()
    vaild_comment_cnt = article.comments.filter(is_deleted=False).count()

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
            secret = request.POST.get('secret') == 'on'
            new_comment = Comment.objects.create(
                article=article,
                content=content,
                creator=request.user,
                is_secret = secret
            )

        elif "reply" in request.POST:
            comment_id = request.POST['comment_id']
            comment = Comment.objects.get(pk=comment_id)
            content = request.POST['content']
            secret = request.POST.get('secret') == 'on'
            new_reply = Reply.objects.create(
                comment=comment,
                content=content,
                creator=request.user,
                is_secret = secret
            )

        return redirect('detail_category', category, article_id)
    return render(request, 'category.html', {
        'article_cnt': article_cnt,
        'hobby_cnt': hobby_cnt,
        'food_cnt': food_cnt,
        'programming_cnt': programming_cnt,
        'vaild_comment_cnt': vaild_comment_cnt,
        'category_cnt': category_cnt,
        'article': article,
        'user_like': user_like,
        'category_kr': category_kr if category_kr else None,
        'after_article_id': after_article.id if after_article else None,
        'before_article_id': before_article.id if before_article else None,
        'total_article': part_article
        })

@login_required
@check_is_creator_or_admin(Article, "article_pk")
def delete_article(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    article.delete()

    return redirect('list')

@login_required
@check_is_creator_or_admin(Comment, "comment_pk")
def delete_comment(request, article_pk, comment_pk):
    comment = Comment.objects.get(pk=comment_pk)
    reply_cnt = Reply.objects.filter(comment=comment).count()

    if reply_cnt > 0:
        comment.is_deleted = True
        comment.save()
    else:
        comment.delete()

    return redirect('detail', article_id=article_pk)

@login_required
@check_is_creator_or_admin(Reply, "reply_pk")
def delete_reply(request, article_pk, comment_pk, reply_pk):
    reply = Reply.objects.get(pk = reply_pk)
    reply.delete()

    reply_cnt = Reply.objects.filter(comment_id=comment_pk).count()
    comment = Comment.objects.get(pk=comment_pk)

    if reply_cnt == 0 and comment.is_deleted:
        comment.delete()
        
    return redirect('detail', article_pk)


@csrf_exempt
def comment(request):
    if request.method == 'POST':
        request_body = json.loads(request.body)
        content = request_body['content']
        is_secret = request_body.get('is_secret', False)
        article_pk = request_body['article_pk']
        article = Article.objects.get(id=article_pk)

        new_comment = Comment.objects.create(
                creator = request.user,
                content = content,
                is_secret = is_secret,
                article=article
            )
        response = {
            'comment_id': new_comment.id,
            'creator': new_comment.creator.username,
            'content': new_comment.content,
            'time': new_comment.write_time.strftime('%Y-%m-%d %H:%M')  # Formatting time
        }

        return HttpResponse(json.dumps(response))
    
@csrf_exempt
def reply(request):
    if request.method == 'POST':
        request_body = json.loads(request.body)
        content = request_body['content']
        is_secret = request_body.get('is_secret', False)
        comment_pk = request_body['comment_pk']
        comment = Comment.objects.get(id=comment_pk)

        new_reply = Reply.objects.create(
                creator = request.user,
                content = content,
                is_secret = is_secret,
                comment = comment
            )
        
        local_time = timezone.localtime(new_reply.write_time)
        response = {
            'reply_id': new_reply.id,
            'creator': new_reply.creator.username,
            'content': new_reply.content,
            'time': local_time.strftime('%Y-%m-%d %H:%M')
        }

        return HttpResponse(json.dumps(response))
    
@csrf_exempt
def like(request):
    if request.method == 'POST':
        request_body = json.loads(request.body)
        article_pk = request_body['article_pk']
        article = Article.objects.get(id=article_pk)
        user_like = Like.objects.filter(creator = request.user, article = article)
        is_like = False

        if user_like.exists():
            user_like.delete()
        else:
            Like.objects.create(
                creator = request.user,
                article = article
            )
            is_like = True
        response = {
            'like_count': article.likes.count(),
            'is_like': is_like
        }

        return HttpResponse(json.dumps(response))
        