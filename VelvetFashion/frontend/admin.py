from django.contrib import admin
from .models import *
from django.utils.safestring import mark_safe


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [f.name for f in CustomUser._meta.fields]
    list_editable = [f.name for f in CustomUser._meta.fields if f.name != "id"]
    list_display_links = None

@admin.register(Notation)
class NotationAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Notation._meta.fields]
    list_display_links = None

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Review._meta.fields]
    list_editable = [f.name for f in Review._meta.fields if f.name != "id"]
    list_display_links = None

@admin.register(ReviewToMaster)
class ReviewToMasterAdmin(admin.ModelAdmin):
    list_display = [f.name for f in ReviewToMaster._meta.fields]
    list_editable = [f.name for f in ReviewToMaster._meta.fields if f.name != "id"]
    list_display_links = None

@admin.register(Master)
class MasterAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Master._meta.fields]
    list_editable = [f.name for f in Master._meta.fields if f.name != "id"]
    list_display_links = None

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Service._meta.fields]
    list_editable = [f.name for f in Service._meta.fields if f.name != "id"]
    list_display_links = None
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Category._meta.fields]
    list_editable = [f.name for f in Category._meta.fields if f.name != "id"]
    list_display_links = None
    
@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = [f.name for f in Image._meta.fields] + ["image_show"]
    list_editable = [f.name for f in Image._meta.fields if f.name != "id"]
    list_display_links = None
    
    def image_show(self, obj):
        if obj.image:
            return mark_safe("<img src='{}' width='60' />".format(obj.image.url))
        return "None"

    image_show.__name__ = "image"