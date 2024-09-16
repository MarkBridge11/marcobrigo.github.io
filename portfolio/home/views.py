from django.shortcuts import render, redirect
from .models import Education,Competencies,Tools

from django.core.mail import send_mail, EmailMessage
from django.conf import settings

def home(request):
    education = Education.objects.all
    competencies = Competencies.objects.all
    tools = Tools.objects.all
    return render(request,'index.html',{"education": education,"competencies":competencies,"tools":tools})

def send_email_to_client(request):
    if request.method == 'POST':
        # Get the form data from the request
        full_name = request.POST.get('fullName')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        send_mail(
            subject=f"New message from {full_name}",  
            message=message, 
            from_email=email,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False       
        )
        
        confirmation_email = EmailMessage(
            subject=f"Thank you for your message {full_name}!",
            body="Thank you for contacting me! I have received your message and will get back to you soon.",
            from_email=settings.EMAIL_HOST_USER,  # From your server email
            to=[email],  # Send to the user's email
        )
        confirmation_email.send(fail_silently=False)
        
    return redirect('/')