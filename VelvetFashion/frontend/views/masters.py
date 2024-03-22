from frontend.serializer import MasterSerializer, ReviewSerializer
from django.utils.decorators import method_decorator
from utils.logging import logging_decorator
from django.views.generic import View
from django.http import HttpResponse
from frontend.models import Master
import json


@method_decorator(logging_decorator, name='dispatch')
class GetReviewsToMaster(View):
    def get(self, request, id):
        reviews = Master.objects.prefetch_related("reviews").get(id=id).reviews.all()
        reviews_json = ReviewSerializer(reviews, many=True).data

        return HttpResponse(json.dumps(reviews_json))
    
@method_decorator(logging_decorator, name='dispatch')
class GetMaster(View):
    def get(self, request, id):
        master = Master.objects.get(id=id)
        master_json = MasterSerializer(master).data

        return HttpResponse(json.dumps(master_json))