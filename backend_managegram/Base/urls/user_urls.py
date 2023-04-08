from django.urls import path
from Base.views import user_views as views


urlpatterns = [
    path('', views.getUsers, name='users'),
    
    path('register/', views.registerUser, name='register-user'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]