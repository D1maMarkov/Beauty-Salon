from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from frontend.serializer import NotationSerializer
from django.http import HttpResponse, JsonResponse
from django.views.generic import CreateView, View
from frontend.models import Service, Notation
from utils.logging import logging_decorator
from frontend.forms import NotationForm
import json


@method_decorator(csrf_exempt, name='dispatch')
class CreateBookedOnline(CreateView):
    form_class = NotationForm
    
    def form_valid(self, form):
        service_id = form.cleaned_data.get("service_id")
        service = Service.objects.get(id=service_id)

        notations = Notation.objects.filter(
            date=form.cleaned_data.get("date"),
            month=form.cleaned_data.get("month"),
            time=form.cleaned_data.get("time"),
            service=service
        )

        if len(notations) > 0:
            return HttpResponse(status=409)

        Notation.objects.create(
            name=form.cleaned_data.get("name"), 
            secondname=form.cleaned_data.get("secondname"), 
            phone=form.cleaned_data.get("phone"), 
            date=form.cleaned_data.get("date"),
            month=form.cleaned_data.get("month"),
            time=form.cleaned_data.get("time"),
            service=service
        )

        return JsonResponse({
            "status": "valid",
        })

    def form_invalid(self, form):
        return JsonResponse({
            "status": "invalid",
            'errors': form.errors
        })

@method_decorator(logging_decorator, name='dispatch')
class GetBusyTimes(View):
    def get(self, request, service_id):
        busy_times = Service.objects.prefetch_related("notations").get(id=service_id).notations.all()
        busy_times_json = NotationSerializer(busy_times, many=True).data

        return HttpResponse(json.dumps(busy_times_json))