from django.db import models
from django.contrib.auth.models import  AbstractUser 
from django.conf import settings
from django.utils.text import slugify

# Create your models here.


class User(AbstractUser):
  ROLE_CHOICES=[
    ('viewer', 'Viewer'),
    ('author', 'Author'),
    ('admin', 'Admin'),
  ]
  
  role= models.CharField(max_length=30 , choices=ROLE_CHOICES, default='viewer')
  phone_number = models.CharField(max_length=20)
  email= models.EmailField(unique=True)
  
  
  def __str__(self):
    return self.username
  
class Category(models.Model):
  name = models.CharField(max_length=30, unique=True)
  slug = models.SlugField(unique=True)
  
  
  def __str__(self):
    return self.name
  
  
  class Meta:
    verbose_name = "Category"
    verbose_name_plural = "Categories"
    
    
class Post(models.Model):
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  slug = models.SlugField(unique=True)
  title= models.TextField()
  content= models.TextField()
  category= models.ForeignKey(Category, related_name='posts', on_delete=models.CASCADE)
  image= models.ImageField(upload_to='post/', blank=True, null=True)
  likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_posts", blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.title)
      
    super().save(*args, **kwargs)
    
  def __str__(self):
    return self.title
     
  

class Comment(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  content = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  
  
  def __str__(self):
    return f"{self.user.username} - {self.post}"
  
  
  
    