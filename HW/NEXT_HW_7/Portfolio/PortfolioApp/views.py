from django.shortcuts import render

# Create your views here.
def info(requests):
    return render(requests, 'info.html')

def project(requests):
    return render(requests, 'project.html')
