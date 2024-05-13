from django.contrib import admin
from django.urls import path
from blogApp import views

urlpatterns = [
    path('', views.list, name='list'),
    path('new/', views.new, name='new'),
    path('list', views.list, name='list'),
    path('detail/<int:article_id>', views.detail, name='detail'),
    path('list/<str:category>', views.category, name='category'),
    path('detail/<str:category>/<int:article_id>', views.detail_category, name='detail_category'),
    path('delete-article/<int:article_pk>', views.delete_article, name='delete-article'),
    path('delete-comment/<int:article_pk>/<int:comment_pk>/', views.delete_comment, name='delete-comment'),
    path('delete-reply/<int:article_pk>/<int:comment_pk>/<int:reply_pk>', views.delete_reply, name='delete-reply'),
    path('comment',views.comment, name='comment')
]
