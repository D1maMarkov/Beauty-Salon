from django.http import HttpResponse
from django.shortcuts import render
from .models import *
import json
import logging
from django_ratelimit.decorators import ratelimit
from django.forms.models import model_to_dict


logger = logging.getLogger("main")

@ratelimit(key='ip', rate='15/m', block=True)
def index(request, *args, **kwargs):
    logger.info("index")
    return render(request, "frontend/index.html")

@ratelimit(key='ip', rate='15/m', block=True)
def getBookedOnline(request, name, secondname, phone, time, service):
    logger.info("getBookedOnline")
    try:
        notations = Notation.objects.filter(time=time)
        if len(notations) > 0:
            return HttpResponse(status=202)

        notation = Notation.objects.create(name=name, secondname=secondname, phone=phone, time=time, service=service)
        notation.save()
        
    except Exception as e:
        logger.error(e)

    return HttpResponse(status=200)


@ratelimit(key='ip', rate='15/m', block=True)
def checkTime(request, time):
    logger.info("checkTime")
    try:
        notations = Notation.objects.filter(time=time)
        if len(notations) > 0:
            return HttpResponse(status=202)

    except Exception as e:
        logger.error(e)

    return HttpResponse(status=200)


@ratelimit(key='ip', rate='15/m', block=True)
def getReviews(request):
    logger.info("getReviews")
    try:
        reviewsjson = list(Reviews.objects.all())
        reviews = []
        for i in range(len(reviewsjson)):
            review = model_to_dict(reviewsjson[i])
            review["username"] = model_to_dict(reviewsjson[i].username)
            review["username"]["photo"] = review["username"]["photo"].url
            reviews.append(review)

        reviews = json.dumps(reviews)
        
        return HttpResponse(reviews)
    
    except Exception as e:
        logger.error(e)

    return HttpResponse(status=200)


@ratelimit(key='ip', rate='15/m', block=True)
def getReviews2Master(request, id):
    logger.info("getReviews2Master")
    try:
        reviews = []
        reviewsJson = list(Master.objects.get(id=int(id)).review2master_set.all())
        for i in range(len(reviewsJson)):
            review = model_to_dict(reviewsJson[i]) 
            review["master"] = "a"
            review["username"] = model_to_dict(reviewsJson[i].username)
            review["username"]["photo"] = reviewsJson[i].username.photo.url
            
            reviews.append(review)
            
            return HttpResponse(json.dumps(reviews))
        
    except Exception as e:
        logger.error(e)
       
    return HttpResponse(status=200)

@ratelimit(key='ip', rate='15/m', block=True)
def getServices(request):
    try:
        services = list(Service.objects.all())
        servicesJson = []
        for i in range(len(services)):
            service = model_to_dict(services[i])
            service["category"] = model_to_dict(services[i].category)
            service["photo"] = service["photo"].url
            servicesJson.append(service)
        
        return HttpResponse(json.dumps(servicesJson))
    
    except Exception as e:
        logger.error(e)
        
    HttpResponse(status=200)
    
@ratelimit(key='ip', rate='15/m', block=True)        
def getCategories(request):
    try:
        categories = list(Category.objects.all())
        categoriesJson = list(map(model_to_dict, categories))
            
        return HttpResponse(json.dumps(categoriesJson))
    
    except Exception as e:
        logger.error(e)
        
    return HttpResponse(status=200)

@ratelimit(key='ip', rate='15/m', block=True)
def getMasters(request, category):
    try:
        masters = Category.objects.get(title=category).master_set.all()
        mastersJson = []
        for i in range(len(masters)):
            master = model_to_dict(masters[i])
            master["photo"] = masters[i].photo.url
            mastersJson.append(master)
            
        return HttpResponse(json.dumps(mastersJson))
    
    except Exception as e:    
        logger.error(e)
        
    return HttpResponse(status=200)
    
@ratelimit(key='ip', rate='15/m', block=True)
def getMaster(request, id):
    try:
        master = Master.objects.get(id=int(id))
        masterJson = model_to_dict(master)
        masterJson["photo"] = master.photo.url
        
        return HttpResponse(json.dumps(masterJson))
    
    except Exception as e:
        logger.error(e)
        
    return HttpResponse(status=200)
    