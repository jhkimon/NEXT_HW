from django.shortcuts import render, redirect
from .models import Task
from datetime import datetime
from django.utils import timezone
import random

weekday_kr = ['월', '화', '수', '목', '금', '토', '일']

# 별도의 Model로도 활용 가능
greeting_message = ['Today will be a good day☀️',
                    '☕️ Carpe diem',
                    '🏃 앞서는 비결은 시작하는 것!',
                    '💪 과감하게 행동하면 후환이 없다. ',
                    '🔥 오늘 하루도 파이팅!',
                    '📚 굳은 결심은 유용한 지식이다.',
                    '🙌 가장 어려운 것은 실천의 시작']

# Create your views here.
def home(request):
    today = timezone.now().date()
    today_tasks = Task.objects.filter(due_date__date=today).order_by('due_date')
    upcoming_tasks = Task.objects.filter(due_date__date__gt=today).order_by('due_date')

    for task in upcoming_tasks:
        delta = task.due_date.date() - today
        task.days_diff = delta.days
    
    month = datetime.now().month
    day = datetime.now().day
    weekday = datetime.now().weekday()
    return render(request, 'home.html', {
        'today_tasks': today_tasks,
        'upcoming_tasks': upcoming_tasks,
        'today_cnt': len(today_tasks),
        'today': today,
        'month': month,
        'day': day,
        'weekday': weekday_kr[weekday],
        'greeting': random.choice(greeting_message)
    })

def detail(request, id):
    task = Task.objects.get(pk = id)
    today = timezone.now().date()
    days_diff = (task.due_date.date() - today).days
    print(today)
    print(task.due_date)
    print(task.due_date.date())
    print(days_diff)
    return render(request, 'detail.html', {
        'task': task,
        'days_diff': days_diff
    })

def new(request):
    if request.method == "POST":
        new_task = Task.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            due_date = request.POST['due_date']
        )
        return redirect('detail', new_task.id)
    return render(request, 'new.html')

def update(request, id):
    task = Task.objects.get(pk = id)
    if request.method == "POST":
        Task.objects.filter(pk = id).update(
            title = request.POST['title'],
            content = request.POST['content'],
            due_date = request.POST['due_date']
        )
        return redirect('detail', id)
    return render(request, 'update.html', {'task': task})

def delete(request, id):
    task = Task.objects.get(pk = id)
    task.delete()

    return redirect('home')