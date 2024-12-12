from user import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path, include

urlpatterns = [
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('users/', views.UserListView.as_view(), name='users'),
    path('user/<int:pk>', views.UserDetailView.as_view(), name='user-detail'),
    path('profiles/', views.ProfileListView.as_view(), name='profiles'),
    path('profile/<int:pk>', views.ProfileDetailView.as_view(), name='profile-detail'),]

urlpatterns = format_suffix_patterns(urlpatterns)
