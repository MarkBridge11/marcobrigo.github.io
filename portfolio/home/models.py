from django.db import models

# Create your models here.

class Competencies(models.Model):
    name = models.CharField(max_length=100)
    additional_description = models.TextField(max_length=400,null=True, blank=True, default=None)

class Education(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=900)
    start_date = models.SmallIntegerField(null=True,blank=True,default=None) 
    end_date = models.SmallIntegerField(null=True,blank=True,default=None) 
    
class Tools(models.Model):
    name = models.CharField(max_length=100)
    additional_description = models.TextField(max_length=400,null=True, blank=True, default=None)