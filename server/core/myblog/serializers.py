from rest_framework import serializers
from rest_framework.validators import UniqueValidator 
from .models import User, Post, Category, Comment


class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only= True)
  
  email = serializers.EmailField(required=True, validators= [UniqueValidator(queryset= User.objects.all(), message="A user with this email already exists")] )
  
  class Meta:
    model= User
    fields = ['id', 'first_name', 'last_name', 'phone_number', 'username', 'email', 'password']
    
  def create(self, validated_data):
    user = User.objects.create_user(
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      phone_number=validated_data['phone_number'],
      username=validated_data['username'],
      email=validated_data.get('email'),
      password=validated_data['password'],
      role= 'viewer',
    )
    
    return user

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields= ['id', 'username', 'first_name', 'last_name', 'email', 'role']
    
    
class PostSerializer(serializers.ModelSerializer):
  
  author_name = serializers.CharField(source="author.username", read_only= True)
  category_name = serializers.CharField(read_only=True, source="category.name")
  
  
  class Meta:
    model = Post
    fields = ['id','author', 'author_name', 'slug', 'title', 'content', 'category', 'image', 'likes', 'created_at', 'updated_at', 'category_name']
    
    read_only_fields= ['author', 'slug']
    
    
    
class CategorySerializer(serializers.ModelSerializer):   

  class Meta:
    model = Category
    fields = ["id", "slug", "name"]


class CommentSerializer(serializers.ModelSerializer):
  user_name = serializers.CharField(source="user.username", read_only=True)
  
  
  class Meta:
    
    model = Comment
    fields = ["id", "post", "user", "user_name", "content", "created_at"]
    read_only_fields= ["user", "created_at"]
      