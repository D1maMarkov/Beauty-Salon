from django.urls import path
from .views.main_page import *
from .views.masters import *
from .views.notation import *
from .views.service_page import *


urlpatterns = [
    path('', Index.as_view()),
    path('booked-online', Index.as_view()),
    path('master/<master>', Index.as_view()),
    path('service/<int:id>', Index.as_view()),
    path('create-notation/<service>', Index.as_view()),
    path('get-reviews', GetReviews.as_view()),
    path("get-services", GetServices.as_view()),
    path("get-categories", GetCategories.as_view()),
    path("get-master/<int:id>", GetMaster.as_view()),
    path("get-service/<int:id>", GetService.as_view()),
    path('get-images/<int:iter>', GetImages.as_view()),
    path("get-masters/<int:category_id>", GetMasters.as_view()),
    path("get-busy-times/<int:service_id>", GetBusyTimes.as_view()),
    path('get-reviews-to-master/<int:id>', GetReviewsToMaster.as_view()),
    path('create-booked-online', CreateBookedOnline.as_view()),
]