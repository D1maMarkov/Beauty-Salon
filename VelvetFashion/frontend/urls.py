from django.urls import path
from .views import *


urlpatterns = [
    path('', index),
    path('booked-online', index),
    path('master/<master>', index),
    path('service/<int:id>', index),
    path('create-notation/<service>', index),
    path('get-reviews', get_reviews),
    path("get-services", get_services),
    path("get-categories", get_categories),
    path("get-master/<int:id>", get_master),
    path("get-service/<int:id>", get_service),
    path("get-masters/<int:category_id>", get_masters),
    path("get-busy-times/<int:service_id>", get_busy_times),
    path('get-reviews-to-master/<int:id>', get_reviews_to_master),
    path('get-booked-online/<name>/<secondname>/<phone>/<int:date>/<month>/<time>/<int:service_id>', get_booked_online),
]
