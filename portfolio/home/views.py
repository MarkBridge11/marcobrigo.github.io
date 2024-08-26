from django.shortcuts import render
from .models import Experiences,Competencies

def home(request):
    experiences = Experiences.objects.all
    competencies = Competencies.objects.all
    return render(request,'index.html',{"experiences": experiences,"competencies":competencies})
