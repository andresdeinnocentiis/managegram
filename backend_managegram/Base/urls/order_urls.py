from django.urls import path
from Base.views import order_views as views


urlpatterns = [
    path('', views.getAllOrders, name='orders'),
    
    path('user/<str:pk>/', views.getUserOrders, name='user-orders'),
    
    path('<str:pk>/', views.createOrder, name='order'),    
    
    path('create/', views.getOrderById, name='create-order'),
    
    path('update/<str:pk>/', views.updateOrder, name='order-update'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='order-paid'),
    
    path('delete/<str:pk>/', views.deleteOrder, name='order-delete'),
]