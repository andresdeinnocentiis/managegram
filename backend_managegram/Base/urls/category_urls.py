from django.urls import path
from Base.views import product_views as views


urlpatterns = [
    path('', views.getAllCategories, name='categories'),
    
    path('user/<str:pk>/', views.getUserCategories, name='user-categories'),
    
    path('<str:pk>/', views.getCategoryById, name='category'),    
    
    path('create/', views.createCategory, name='create-category'),
    
    path('update/<str:pk>/', views.updateCategory, name='category-update'),
    
    path('delete/<str:pk>/', views.deleteCategory, name='category-delete'),
]