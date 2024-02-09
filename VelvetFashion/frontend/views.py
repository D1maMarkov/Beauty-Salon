from django.http import HttpResponse
from django.shortcuts import render
from .models import *
from django_ratelimit.decorators import ratelimit
from django.forms.models import model_to_dict
import logging
import json


logger = logging.getLogger("main")

def logging_decorator(func):
    def wrapper(request, *args, **kwargs):
        try:
            response = func(request, *args, **kwargs)
            return response
        except Exception as e:
            logger.error(e)
            return HttpResponse(status=200)
        
    return wrapper

 
@ratelimit(key='ip', rate='15/m', block=True)
def index(request, *args, **kwargs):
    return render(request, "frontend/index.html")


@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_booked_online(request, name, secondname, phone, date, month, time, service_id):
    service = Service.objects.get(id=service_id)
    notations = Notation.objects.filter(date=date, month=month, time=time, service=service)
    if len(notations) > 0:
        return HttpResponse(status=202)

    Notation.objects.create(
        name=name, 
        secondname=secondname, 
        phone=phone, 
        date=date,
        month=month,
        time=time, 
        service=service
    )

    return HttpResponse(status=200)


@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_reviews(request):
    logger.info("getReviews")
    
    reviews_json = list(Review.objects.all())
    reviews = []
    for i in range(len(reviews_json)):
        review = model_to_dict(reviews_json[i])
        review["username"] = model_to_dict(reviews_json[i].username)
        review["username"]["photo"] = review["username"]["photo"].url
        reviews.append(review)

    reviews = json.dumps(reviews)
    
    return HttpResponse(reviews)

@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_reviews_to_master(request, id):  
    reviews = []
    reviews_json = Master.objects.get(id=id).reviewtomaster_set.all()
    for review_json in reviews_json:
        review = model_to_dict(review_json)
        review["username"] = model_to_dict(review_json.username)
        review["username"]["photo"] = review_json.username.photo.url
        
        reviews.append(review)
        
    return HttpResponse(json.dumps(reviews))


@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_service(request, id):
    service = Service.objects.get(id=id)
    service_json = model_to_dict(service)
    service_json["photo"] = service.photo.url

    return HttpResponse(json.dumps(service_json))

    
@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_busy_times(request, service_id):
    busy_times = Service.objects.get(id=service_id).notation_set.all()
    
    busy_times_json = [{
        "time": notation.time,
        "date": notation.date,
        "month": notation.month,
    } for notation in busy_times]


    return HttpResponse(json.dumps(busy_times_json))


@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_services(request):
    services = Service.objects.all()
    services_json = []
    
    for service_json in services:
        service = model_to_dict(service_json)
        service["photo"] = service_json.photo.url
        service["category"] = model_to_dict(Category.objects.get(id=int(service["category"])))
        services_json.append(service)
    
    return HttpResponse(json.dumps(services_json))
    

@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)        
def get_categories(request):
    categories = Category.objects.all()
    categories_json = list(map(model_to_dict, categories))
        
    return HttpResponse(json.dumps(categories_json))
    

@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_masters(request, category_id):
    masters = Category.objects.get(id=category_id).master_set.all()
    masters_json = []
    for master in masters:
        master_json = model_to_dict(master)
        master_json["photo"] = master.photo.url
        masters_json.append(master_json)
        
    return HttpResponse(json.dumps(masters_json))
    

@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_master(request, id):
    master = Master.objects.get(id=id)
    master_json = model_to_dict(master)
    master_json["photo"] = master.photo.url
    
    return HttpResponse(json.dumps(master_json))


@logging_decorator
@ratelimit(key='ip', rate='15/m', block=True)
def get_images(request, iter):
    images = Image.objects.all().order_by('id')[iter * 6: (iter + 1) * 6]
    
    one_more = (iter + 1) * 6 <= Image.objects.count()

    images_json = list(map(lambda x: x.image.url, images))
    
    response = {'one_more': one_more, 'images': images_json}
    
    return HttpResponse(json.dumps(response))
    