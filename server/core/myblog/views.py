from django.shortcuts import render
from .models import Category, Post, User, Comment
from .serializers import CategorySerializer, UserSerializer, PostSerializer, RegisterSerializer, CommentSerializer
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied

# Create your views here.

class RegisterListView(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer


class UserListView(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  
  
class UserRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  
  
class PostListView(generics.ListCreateAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]
  
  def perform_create(self, serializer):
    serializer.save(author=self.request.user)
    
       
class PostRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer


class PostDetailView(generics.RetrieveAPIView):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]
  lookup_field = "slug"


class CategoryListView(generics.ListCreateAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  

class CategoryRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer 

  
class Me(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)



class CommentListCreateView(generics.ListCreateAPIView):
  serializer_class= CommentSerializer
  permission_classes= [permissions.IsAuthenticatedOrReadOnly]
  
  def get_queryset(self):
    post_id = self.request.query_params.get("post")
    
    return Comment.objects.filter(post_id= post_id).order_by("-created_at")
  
  
  def perform_create(self, serializer):
    serializer.save(user=self.request.user)
  
class CommentDeleteView(generics.DestroyAPIView):
  queryset = Comment.objects.all()
  serializer_class= CommentSerializer
  permission_classes= [permissions.IsAuthenticated]
  
  
  def perform_destroy(self, instance):
    
    if (
      self.request.user.role == "admin" or instance.user == self.request.user
    ):
      instance.delete()
    else:
      raise PermissionDenied(
        "You cannot delete this comment"
      )
      