from django.db import models
from django.contrib.auth.models import User
from .forms import *


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=150, null=True)
    photo = models.ImageField(upload_to='userPhotos/%Y/%m/%d', blank=False, null=True)
    
class Notation(models.Model):
    name = models.CharField(max_length=150, null=True)
    secondname = models.CharField(max_length=150, null=True)
    phone = models.CharField(max_length=150, null=True)
    time = models.CharField(max_length=150, null=True)
    service = models.CharField(max_length=150, null=True)

class Reviews(models.Model):
    username = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    date = models.CharField(max_length=150, null=True)
    estimation = models.IntegerField(null=True)
    body = models.CharField(max_length=1500, null=True)

class Review2Master(models.Model):
    username = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    date = models.CharField(max_length=150, null=True)
    estimation = models.IntegerField(null=True)
    body = models.CharField(max_length=1500, null=True)
    master = models.ForeignKey("Master", on_delete=models.CASCADE, null=True)
    
class Category(models.Model):
    title =  models.CharField(max_length=150)
    
    
class Service(models.Model):
    title = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='servicePhotos/%Y/%m/%d', blank=False, null=True)
    price = models.IntegerField()
    
    
class Master(models.Model):
    name = models.CharField(max_length=150)
    profession = models.CharField(max_length=150)
    photo = models.ImageField(upload_to='masterPhotos/%Y/%m/%d', blank=False, null=True)
    biography = models.CharField(max_length=50000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)