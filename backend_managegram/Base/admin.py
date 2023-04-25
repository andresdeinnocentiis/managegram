from django.contrib import admin
from .models import *

# Register your models here.


class ClientAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'first_name', 'last_name', 'user', 'email', 'phone', 'other_details']

class SupplierAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'user', 'email', 'phone', 'address', 'other_details']

class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ['id', 'client', 'street', 'st_num', 'city', 'state', 'country', 'zip_code', 'other_details']

class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'supplier', 'product_code', 'name', 'brand', 'category', 'price', 'description']   

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'name', 'qty', 'price']   

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'client', 'shipping_address', 'discount', 'payment_method', 'gross_price', 'tax_price', 'shipping_price', 'total_price', 'is_delivered', 'is_paid', 'other_details']   

class BrandAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name'] 

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name']   

class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'client', 'order', 'amount', 'paid_on', 'other_details']   

class DiscountAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name', 'percentage', 'conditions']   
    
    

admin.site.register(Supplier, SupplierAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Discount, DiscountAdmin)
admin.site.register(Brand, BrandAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Payment)
admin.site.register(ShippingAddress, ShippingAddressAdmin)
