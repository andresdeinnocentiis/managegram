from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Supplier(models.Model):
    user            = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    name            = models.CharField(max_length=100, null=False, blank=False)
    email           = models.CharField(max_length=100, null=True, blank=True)
    phone           = models.CharField(max_length=100, null=True, blank=True)
    address         = models.CharField(max_length=200, null=True, blank=True)
    other_details   = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class Client(models.Model):
    user            = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    name            = models.CharField(max_length=100, null=False, blank=False)
    first_name      = models.CharField(max_length=100, null=False, blank=False)
    last_name       = models.CharField(max_length=100, null=False, blank=False)
    email           = models.CharField(max_length=100, null=True, blank=True)
    phone           = models.CharField(max_length=100, null=True, blank=True)
    other_details   = models.TextField(null=True, blank=True)
    
    def get_addresses(self):
        return ShippingAddress.objects.filter(client=self)

    @property
    def addresses(self):
        return self.get_addresses()
    
    def __str__(self):
        return self.name

class ShippingAddress(models.Model):
    client          = models.ForeignKey(Client, on_delete=models.CASCADE, null=False, blank=False)
    street          = models.CharField(max_length=100, null=False, blank=False)
    st_num          = models.IntegerField(null=True, blank=True)
    city            = models.CharField(max_length=100, null=False, blank=False)
    state           = models.CharField(max_length=100, null=False, blank=False)
    country         = models.CharField(max_length=100, null=False, blank=False)
    zip_code        = models.CharField(max_length=100, null=False, blank=False)
    other_details   = models.TextField(null=True, blank=True)
    
    def __str__(self):
        if self.zip_code:
            return f"{self.street} {self.st_num}, {self.city}, {self.state}, {self.zip_code}, {self.country}"
        else:
            return f"{self.street} {self.st_num}, {self.city}, {self.state}, {self.country}"

class Brand(models.Model):
    user            = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    name            = models.CharField(max_length=200, null=False, blank=False)
    
    def __str__(self):
        return self.name

class Category(models.Model):
    user            = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    name            = models.CharField(max_length=200, null=False, blank=False)

    def __str__(self):
        return self.name

class Product(models.Model):
    supplier        = models.ForeignKey(Supplier, on_delete=models.CASCADE, null=False)
    product_code    = models.CharField(max_length=200, null=True, blank=True)
    name            = models.CharField(max_length=200, null=True, blank=True)
    brand           = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True)
    category        = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    description     = models.TextField(null=True, blank=True)
    price           = models.DecimalField(max_digits=16, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return self.name
    
    
class Discount(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    name            = models.CharField(max_length=100, null=True, blank=True)
    percentage      = models.DecimalField(max_digits=3, decimal_places=2, null=False, blank=False)
    conditions      = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} - {self.percentage}"
    
class Order(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    client              = models.ForeignKey(Client, on_delete=models.CASCADE, null=False, blank=False)
    shipping_address    = models.ForeignKey(ShippingAddress, on_delete=models.CASCADE, null=True, blank=True)
    discount            = models.ForeignKey(Discount, on_delete=models.SET_NULL, null=True, blank=True)
    payment_method      = models.CharField(max_length=200, null=True, blank=True)
    gross_price         = models.DecimalField(max_digits=16, decimal_places=2, null=False, blank=False)
    tax_price           = models.DecimalField(max_digits=16, decimal_places=2, null=True, blank=True)
    shipping_price      = models.DecimalField(max_digits=16, decimal_places=2, null=True, blank=True)
    total_price         = models.DecimalField(max_digits=16, decimal_places=2, null=False, blank=False)
    created_on          = models.DateTimeField(auto_now_add=True)
    is_delivered        = models.BooleanField(default=False)
    delivered_on        = models.DateTimeField(auto_now_add=True)
    is_paid             = models.BooleanField(default=False)
    paid_on             = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    other_details       = models.TextField(null=True, blank=True)
    
    
    def get_payments(self):
        return Payment.objects.filter(order=self)

    @property
    def payments(self):
        return self.get_payments()
    
    def __str__(self):
        return f"{self.client} - {self.created_on}"
    

class OrderItem(models.Model):
    order               = models.ForeignKey(Order, on_delete=models.CASCADE, null=False, blank=False)
    product             = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    name                = models.CharField(max_length=200, null=True, blank=True)
    qty                 = models.IntegerField(null=True, blank=True, default=0)
    price               = models.DecimalField(max_digits=16, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return self.product
    
class Payment(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    client              = models.ForeignKey(Client, on_delete=models.CASCADE, null=False, blank=False)
    order               = models.ForeignKey(Order, on_delete=models.CASCADE, null=False, blank=False)
    amount              = models.DecimalField(max_digits=16, decimal_places=2, null=True, blank=True)
    paid_on             = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    receipt_image       = models.ImageField(null=True, blank=True)
    other_details       = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.amount} for order: {self.order}"