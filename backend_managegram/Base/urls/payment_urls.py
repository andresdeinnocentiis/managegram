from django.urls import path
from Base.views import order_views as views


urlpatterns = [
    path('', views.getAllPayments, name='payments'),
    
    path('user/<str:pk>/', views.getUserPayments, name='user-payments'),
    
    path('<str:pk>/', views.getPaymentById, name='payment'),    
    
    path('create/', views.createPayment, name='create-payment'),
    
    path('update/<str:pk>/', views.updatePayment, name='payment-update'),
    
    path('delete/<str:pk>/', views.deletePayment, name='payment-delete'),
]