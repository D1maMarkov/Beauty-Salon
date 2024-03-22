from .models import Master, Category, Service, Notation, Review, CustomUser
from rest_framework import serializers


class MasterSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()

    class Meta:
        model = Master
        fields = ('id', 'name','profession', 'photo', 'biography')

    def get_photo(self, master):
        return master.photo.url

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title')

class ServiceSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = ('id', 'title', 'category', 'photo', 'price')
        
    def get_category(self, service):
        return CategorySerializer(service.category).data
    
    def get_photo(self, service):
        return service.photo.url
    
class NotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notation
        fields = ('time', 'date', 'month')

class UserSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'photo')
        
    def get_photo(self, user):
        return user.photo.url

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = ('id', 'username', 'date', 'estimation', 'body')
        
    def get_username(self, review):
        return UserSerializer(review.username).data