from django.urls import path
from Base.views import user_views as views


urlpatterns = [
    path('', views.getAllClients, name='clients'),
    
    path('user/<str:pk>/', views.getUserClients, name='user-clients'),
    
    path('create/', views.createClient, name='create-client'),
    
    path('update/<str:pk>/', views.updateClient, name='client-update'),
    
    path('delete/<str:pk>/', views.deleteClient, name='client-delete'),
]