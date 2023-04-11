from django.urls import path
from Base.views import user_views as views


urlpatterns = [
    path('', views.getAllShippingAddresses, name='shipping-addresses'),
    
    path('user/<str:pk>/', views.getUserShippingAddresses, name='user-shipping-addresses'),
    
    path('create/', views.createShippingAddress, name='create-shipping-address'),
    
    path('update/<str:pk>/', views.updateShippingAddress, name='shipping-address-update'),
    
    path('delete/<str:pk>/', views.deleteShippingAddress, name='shipping-address-delete'),
]