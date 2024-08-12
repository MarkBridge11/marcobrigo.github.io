from django.shortcuts import render

def hi(request):
    return render(request,'home/index.html')
