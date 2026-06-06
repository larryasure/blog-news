from rest_framework.permissions import BasePermission, SAFE_METHODS
 
  
class IsAuthorOrAdmin(BasePermission):
  
  def has_permission(self, request, view):
    
    if request.method in SAFE_METHODS:
      return True
    
    if not request.user.is_authenticated:
      return False
    

    if request.method == "POST":
      return request.user.role in ["admin", "author"]
    
    return True
  
  
  def has_object_permission(self, request, view, obj):
    
    if request.method in SAFE_METHODS:
      return True
    
    
    if request.user.role == "admin":
      return True
    
    if obj.author == request.user:
      return True  
    
    return False