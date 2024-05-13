from django.shortcuts import render, redirect
from .forms import UserCreationForm, LoginForm
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as django_login, get_user_model
from blogApp.models import Article

# Create your views here.

def check_admin_exists():
    return get_user_model().objects.filter(username="admin").exists()

def signup(request):
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            user.backend = 'django.contrib.auth.backends.ModelBackend'  
            django_login(request, user)
            return redirect("list")
        else:
            print(form.errors)
    else:
        form = UserCreationForm()

    return render(request, "signup.html", 
                  {"form": form,
                  "article_cnt": article_cnt,
                  'hobby_cnt': hobby_cnt,
                  "food_cnt": food_cnt,
                  'programming_cnt': programming_cnt})


def login(request):
    article_cnt = Article.objects.count()
    hobby_cnt = Article.objects.filter(category="hobby").count()
    food_cnt = Article.objects.filter(category="food").count()
    programming_cnt = Article.objects.filter(category="programming").count()
    
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username=username, password=password)
            if user is not None:
                django_login(request, user)
                return redirect("list")
            else:
                form.add_error(None, "유저 이름 또는 비밀번호가 올바르지 않습니다.")
    else:
        form = LoginForm()
    return render(request, "login.html", 
                  {"form": form,
                  "article_cnt": article_cnt,
                  'hobby_cnt': hobby_cnt,
                  "food_cnt": food_cnt,
                  'programming_cnt': programming_cnt})


def logout_user(request):
    if request.user.is_authenticated:
        logout(request)
        return redirect("list")
    else:
        return redirect("login")
