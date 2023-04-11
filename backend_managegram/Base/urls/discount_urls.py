from django.urls import path
from Base.views import order_views as views


urlpatterns = [
    path('', views.getAllDiscounts, name='discounts'),
    
    path('user/<str:pk>/', views.getUserDiscounts, name='user-discounts'),
    
    path('<str:pk>/', views.getDiscountById, name='discount'),    
    
    path('create/', views.createDiscount, name='create-discount'),
    
    path('update/<str:pk>/', views.updateDiscount, name='discount-update'),
    
    path('delete/<str:pk>/', views.deleteDiscount, name='discount-delete'),
]