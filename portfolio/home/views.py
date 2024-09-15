from django.shortcuts import render
from .models import Education,Competencies,Tools

def home(request):
    education = Education.objects.all
    competencies = Competencies.objects.all
    tools = Tools.objects.all
    return render(request,'index.html',{"education": education,"competencies":competencies,"tools":tools})
