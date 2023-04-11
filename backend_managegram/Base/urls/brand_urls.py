from django.urls import path
from Base.views import product_views as views


urlpatterns = [
    path('', views.getAllBrands, name='brands'),
    
    path('user/<str:pk>/', views.getUserBrands, name='user-brands'),
    
    path('<str:pk>/', views.getBrandById, name='brand'),    
    
    path('create/', views.createBrand, name='create-brand'),
    
    path('update/<str:pk>/', views.updateBrand, name='brand-update'),
    
    path('delete/<str:pk>/', views.deleteBrand, name='brand-delete'),
]