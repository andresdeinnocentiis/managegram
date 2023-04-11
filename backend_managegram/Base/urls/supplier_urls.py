from django.urls import path
from Base.views import user_views as views


urlpatterns = [
    path('', views.getAllSuppliers, name='suppliers'),
    
    path('user/<str:pk>/', views.getUserSuppliers, name='user-suppliers'),
    
    path('create/', views.createSupplier, name='create-supplier'),
    
    path('update/<str:pk>/', views.updateSupplier, name='supplier-update'),
    
    path('delete/<str:pk>/', views.deleteSupplier, name='supplier-delete'),
]