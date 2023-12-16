from django.contrib import admin
from .models import *
from django.forms import ModelForm, ModelChoiceField


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['user', 'username', 'photo']
    list_editable = ['user', 'username', 'photo']
    list_display_links = None

@admin.register(Notation)
class NotationAdmin(admin.ModelAdmin):
    list_display = ['service', 'time', "month", "date", 'name', 'secondname', 'phone']
    list_editable = ['service', 'time', "month", "date", 'name', 'secondname', 'phone']
    list_display_links = None

@admin.register(Reviews)
class ReviewsAdmin(admin.ModelAdmin):
    list_display = ['username', 'body', 'estimation', 'date']
    list_editable = ['username', 'body', 'estimation', 'date']
    list_display_links = None

@admin.register(ReviewToMaster)
class ReviewsToMasterAdmin(admin.ModelAdmin):
    list_display = ['username', 'master', 'body', 'estimation', 'date']
    list_editable = ['username', 'master', 'body', 'estimation', 'date']
    list_display_links = None

@admin.register(Master)
class MasterAdmin(admin.ModelAdmin):
    list_display = ['name', 'photo', 'biography', 'profession']
    list_editable = ['name', 'photo', 'biography', 'profession']
    list_display_links = None

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'photo', 'price']
    list_editable = ['title', 'category', 'photo', 'price']
    list_display_links = None
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title']
    list_editable = ['title']
    list_display_links = None