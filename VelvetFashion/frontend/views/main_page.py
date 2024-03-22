from frontend.serializer import CategorySerializer, ServiceSerializer, ReviewSerializer
from frontend.models import Review, Service, Category, Image
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.generic import View, TemplateView
from utils.logging import logging_decorator
from django.http import HttpResponse
import json


@method_decorator(cache_page(15 * 60), name='dispatch')
class Index(TemplateView):
    template_name = "frontend/index.html"

@method_decorator(logging_decorator, name='dispatch')
class GetReviews(View):
    def get(self, request):
        reviews = Review.objects.all()
        reviews_json = ReviewSerializer(reviews, many=True).data
        
        return HttpResponse(json.dumps(reviews_json))

@method_decorator(logging_decorator, name='dispatch')
class GetServices(View):
    def get(self, request):
        services = Service.objects.select_related("category").all()
        services_json = ServiceSerializer(services, many=True).data

        return HttpResponse(json.dumps(services_json))

@method_decorator(logging_decorator, name='dispatch')
class GetCategories(View):
    def get(self, request):
        categories = Category.objects.all()
        categories_json = CategorySerializer(categories, many=True).data

        return HttpResponse(json.dumps(categories_json))

@method_decorator(logging_decorator, name='dispatch')
class GetImages(View):
    def get(self, request, iter):
        images = Image.objects.all().order_by('id')[iter*6 : (iter+1)*6]
        one_more = (iter + 1) * 6 <= Image.objects.count()
        images_json = [image.image.url for image in images]

        response = {'one_more': one_more, 'images': images_json}

        return HttpResponse(json.dumps(response))