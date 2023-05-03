from django.urls import path
from Base.views import product_views as views


urlpatterns = [
    path('', views.getAllProducts, name='products'),
    
    path('user/<str:pk>/', views.getUserProducts, name='user-products'),
    
    path('supplier/<str:pk>/', views.getSupplierProducts, name='supplier-products'),
    
    path('create/', views.createProduct, name='create-product'),
    
    path('update/<str:pk>/', views.updateProduct, name='product-update'),
    
    path('delete/<str:pk>/', views.deleteProduct, name='product-delete'),
]