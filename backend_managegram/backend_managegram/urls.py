"""backend_managegram URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
        
    #path('', TemplateView.as_view(template_name='index.html') ),
    
    path('api/users/', include('Base.urls.user_urls')),
    path('api/clients/', include('Base.urls.client_urls')),
    path('api/suppliers/', include('Base.urls.supplier_urls')),
    path('api/shipping_addresses/', include('Base.urls.shipping_address_urls')),
    
    path('api/products/', include('Base.urls.product_urls')),
    path('api/brands/', include('Base.urls.brand_urls')),
    path('api/categories/', include('Base.urls.category_urls')),
    
    path('api/orders/', include('Base.urls.order_urls')),
    path('api/payments/', include('Base.urls.payment_urls')),
    path('api/discounts/', include('Base.urls.discount_urls')),
    path('api/brands/', include('Base.urls.brand_urls')),
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)