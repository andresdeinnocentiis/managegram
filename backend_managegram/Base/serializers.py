from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *


class UserSerializer(serializers.ModelSerializer):
    isAdmin     = serializers.SerializerMethodField(read_only=True)
    clients     = serializers.SerializerMethodField(read_only=True)
    suppliers   = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'isAdmin', 'clients', 'suppliers']
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_clients(self, obj):
        clients = obj.client_set.all()
        serializer = ClientSerializer(clients, many=True)
        return serializer.data
    
    def get_suppliers(self, obj):
        suppliers = obj.supplier_set.all()
        serializer = SupplierSerializer(suppliers, many=True)
        return serializer.data
    

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'isAdmin', 'token', 'clients', 'suppliers']


    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

class ClientSerializer(serializers.ModelSerializer):
    shipping_addresses  = serializers.SerializerMethodField(read_only=True)
    payments            = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Client
        fields = '__all__'
        
    def get_shipping_addresses(self, obj):

        shipping_addresses = obj.shippingaddress_set.all()
        serializer = ShippingAddressSerializer(shipping_addresses, many=True)
        return serializer.data

        
    def get_payments(self, obj):      
        payments = obj.payment_set.all()
        serializer = PaymentSerializer(payments, many=True)
        return serializer.data
        
        

class SupplierSerializer(serializers.ModelSerializer):
    products    = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Supplier
        fields = '__all__'

        
    def get_products(self, obj):
        products = obj.product_set.all()
        serializer = ProductSerializer(products, many=True)
        return serializer.data
        
        

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
        

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'



class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
        

class OrderSerializer(serializers.ModelSerializer):
    orderItems      = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user            = serializers.SerializerMethodField(read_only=True)
    discounts        = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'
    
    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

    def get_client(self, obj):
        client = obj.client
        serializer = ClientSerializer(client, many=False)
        return serializer.data

    def get_discounts(self, obj):
        discount = obj.discount_set.all()
        serializer = DiscountSerializer(discount, many=False)
        return serializer.data
        
    
    
class PaymentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Payment
        fields = '__all__'
    
    
class BrandSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Brand
        fields = '__all__'
    
    
class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'
        

class DiscountSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Discount
        fields = '__all__'