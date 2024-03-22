from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from utils.constants import CHOICE_TIMES, CHOICE_MONTHS


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

class CustomUser(AbstractUser):
    photo = models.ImageField(upload_to='userPhotos/%Y/%m/%d', blank=True, null=True)

class Notation(models.Model):
    name = models.CharField(max_length=150)
    secondname = models.CharField(max_length=150)
    phone = models.CharField(max_length=150)
    time = models.CharField(max_length=150, choices=CHOICE_TIMES)
    month = models.CharField(max_length=150, choices=CHOICE_MONTHS)
    date = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(31)])
    service = models.ForeignKey(Service, related_name="notations", on_delete=models.CASCADE)

class Master(models.Model):
    name = models.CharField(max_length=50)
    profession = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='masterPhotos/%Y/%m/%d', blank=False)
    biography = models.CharField(max_length=50000)
    category = models.ForeignKey(Category, related_name="masters", on_delete=models.CASCADE)

class BaseReview(models.Model):
    username = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.CharField(max_length=150)
    estimation = models.IntegerField()
    body = models.CharField(max_length=1500)

    class Meta:
        abstract = True
    
class Review(BaseReview):
    pass

class ReviewToMaster(BaseReview):
    master = models.ForeignKey(Master, related_name="reviews", on_delete=models.CASCADE)
    
class Image(models.Model):
    image = models.ImageField(upload_to='imagesMainPage/%Y/%m/%d')