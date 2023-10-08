from django.urls import path, include
from .views import *

urlpatterns = [
    path('', index),
    path('master/<master>', index),
    path('createNotation/<service>', index),
    path('bookedOnline', index),
    path('service/<category>/<title>/<price>', index),
    path('getBookedOnline/<name>/<secondname>/<phone>/<time>/<service>', getBookedOnline),
    path('checkTime/<time>', checkTime),
    path('getReviews', getReviews),
    path('getReviews2Master/<id>', getReviews2Master),
    path("getServices", getServices),
    path("getCategories", getCategories),
    path("getMasters/<category>", getMasters),
    path("getMaster/<id>", getMaster),
]
