from frontend.serializer import MasterSerializer, ServiceSerializer
from django.utils.decorators import method_decorator
from utils.logging import logging_decorator
from django.views.generic import View
from django.http import HttpResponse
from frontend.models import *
import json


@method_decorator(logging_decorator, name='dispatch')
class GetService(View):
    def get(self, request, id):
        service = Service.objects.get(id=id)
        service_json = ServiceSerializer(service).data

        return HttpResponse(json.dumps(service_json))

@method_decorator(logging_decorator, name='dispatch')
class GetMasters(View):
    def get(self, request, category_id):
        masters = Category.objects.prefetch_related("masters").get(id=category_id).masters.all()
        masters_json = MasterSerializer(masters, many=True).data

        return HttpResponse(json.dumps(masters_json))