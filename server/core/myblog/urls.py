from .views import  Me, UserListView, UserRetrieveUpdateDeleteView, CategoryListView, CategoryRetrieveUpdateDeleteView,PostListView, PostRetrieveUpdateDeleteView, PostDetailView, RegisterListView, CommentListCreateView, CommentDeleteView 
from django.urls import path
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView)

urlpatterns = [
path('register/',  RegisterListView.as_view(), name= 'register'),

path('user/', UserListView.as_view(), name='user-list'),
path('user/<int:pk>/', UserRetrieveUpdateDeleteView.as_view(), name='user-detail'),

path('categories/', CategoryListView.as_view(), name= 'all-categories'),
path('categories/<int:pk>/', CategoryRetrieveUpdateDeleteView.as_view(), name='all-details'),

path('post/', PostListView.as_view(), name='post-list'),
path('post/<int:pk>/', PostRetrieveUpdateDeleteView.as_view(), name='post-detail'),
path('post/<slug:slug>/', PostDetailView.as_view(), name="post-slug"),

path("comments/", CommentListCreateView.as_view(), name="comment"),
path("comments/<int:pk>/", CommentDeleteView.as_view(), name= "comment-detail"),

path("me/", Me.as_view(), name="me"),

path('token/', TokenObtainPairView.as_view(), name="token-obtain-pair"),
path('token/refresh/', TokenRefreshView.as_view(), name="token-refresh"),

]