from rest_framework.permissions import BasePermission


class ArtistAuthPermission(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if not hasattr(request.user, 'artist'):
            return False
        elif request.user.artist == obj:
            return True
        else:
            return False
    