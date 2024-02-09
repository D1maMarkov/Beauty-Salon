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
    
    def __str__(self):
        return self.title
    
class Service(models.Model):
    title = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='servicePhotos/%Y/%m/%d', blank=False)
    price = models.IntegerField()
    
    def __str__(self):
        return self.title
    
class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=150)
    photo = models.ImageField(upload_to='userPhotos/%Y/%m/%d', blank=False)
    
class Notation(models.Model):
    name = models.CharField(max_length=150)
    secondname = models.CharField(max_length=150)
    phone = models.CharField(max_length=150)
    time = models.CharField(max_length=150, choices=choice_time)
    month = models.CharField(max_length=150, choices=choice_month)
    date = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(31)])
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

class Master(models.Model):
    name = models.CharField(max_length=50)
    profession = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='masterPhotos/%Y/%m/%d', blank=False)
    biography = models.CharField(max_length=50000)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
class Review(models.Model):
    username = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.CharField(max_length=150)
    estimation = models.IntegerField()
    body = models.CharField(max_length=1500)

class ReviewToMaster(models.Model):
    username = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.CharField(max_length=150)
    estimation = models.IntegerField()
    body = models.CharField(max_length=1500)
    master = models.ForeignKey(Master, on_delete=models.CASCADE)
    
class Image(models.Model):
    image = models.ImageField(upload_to='imagesMainPage/%Y/%m/%d')
    
    
    