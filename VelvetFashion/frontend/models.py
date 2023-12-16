from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator 
from .forms import *


choice_time = [
    ("9:30", "9:30"), ("11:30", "11:30"),
    ("12:30", "12:30"), ("13:30", "13:30"),
    ("14:30", "14:30"), ("15:30", "15:30"),
    ("16:30", "16:30"), ("17:30", "17:30"),
    ("18:30", "18:30"), ("19:30", "19:30"),
    ("20:30", "20:30"), ("21:30", "21:30"),
    ("22:30", "22:30")
]

choice_month = [
    ("Январь", "Январь"),
    ("Февраль", "Февраль"),
    ("Март", "Март"),
    ("Апрель", "Апрель"),
    ("Май", "Май"),
    ("Июнь", "Июнь"),
    ("Июль", "Июль"),
    ("Август", "Август"),
    ("Сентябрь", "Сентябрь"),
    ("Октябрь", "Октябрь"),
    ("Ноябрь", "Ноябрь"),
    ("Декабрь", "Декабрь")
]

class Category(models.Model):
    title =  models.CharField(max_length=150)
    
class Service(models.Model):
    title = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='servicePhotos/%Y/%m/%d', blank=False, null=True)
    price = models.IntegerField()
    
class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=150, null=True)
    photo = models.ImageField(upload_to='userPhotos/%Y/%m/%d', blank=False, null=True)
    
class Notation(models.Model):
    name = models.CharField(max_length=150, null=True)
    secondname = models.CharField(max_length=150, null=True)
    phone = models.CharField(max_length=150, null=True)
    time = models.CharField(max_length=150, choices=choice_time, null=True)
    month = models.CharField(max_length=150, choices=choice_month, null=True)
    date = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(31)], null=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, null=True)

class Master(models.Model):
    name = models.CharField(max_length=50)
    profession = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='masterPhotos/%Y/%m/%d', blank=False, null=True)
    biography = models.CharField(max_length=50000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    
class Reviews(models.Model):
    username = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    date = models.CharField(max_length=150, null=True)
    estimation = models.IntegerField(null=True)
    body = models.CharField(max_length=1500, null=True)

class ReviewToMaster(models.Model):
    username = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    date = models.CharField(max_length=150, null=True)
    estimation = models.IntegerField(null=True)
    body = models.CharField(max_length=1500, null=True)
    master = models.ForeignKey(Master, on_delete=models.CASCADE, null=True)