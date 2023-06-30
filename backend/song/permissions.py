from rest_framework import permissions


class SongPermission(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user.is_authenticated and hasattr(request.user, 'artist'):
            return True
        else:
            return False
        
    def has_object_permission(self, request, view, song):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif song.artists.contains(request.user.artist):
            return True
        else:
            False