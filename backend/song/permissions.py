from rest_framework import permissions


class SongPermission(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user.is_authenticated and hasattr(request.user, 'artist'):
            return True
        else:
            return False