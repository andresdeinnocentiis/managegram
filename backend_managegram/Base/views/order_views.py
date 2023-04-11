from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from Base.serializers import ProductSerializer, OrderSerializer, OrderItemSerializer, PaymentSerializer, DiscountSerializer, ShippingAddressSerializer
from Base.models import Product, Client, ShippingAddress, Order, OrderItem, Payment, Discount

# Importamos esto para pasar las respuestas HTTP (ej. 404)
from rest_framework import status
from datetime import datetime

# ORDER VIEWS: 

# Get all orders: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get user orders (without filtering by client): 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# Create order:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createOrder(request):

    user = request.user
    data = request.data
    
    orderItems = data['orderItems']
    
    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        try:
            # (1) Create order:
            order = Order.objects.create(
                
                user = user,
                client = data['client'],
                payment_method = data['payment_method'],
                gross_price = data['gross_price'],
                discount = data['discount'],
                shipping_price= data['shipping_price'],
                total_price = data['total_price'],
                other_details = data['other_details'],
            )
            
            # (2) If shipping address, create it and add it to the order:
            if 'shippingAddress' in data:
                shipping = ShippingAddress.objects.create(
                    client = data['shippingAddress']['client'],
                    street = data['shippingAddress']['street'],
                    st_num = data['shippingAddress']['st_num'],
                    city = data['shippingAddress']['city'],
                    state= data['shippingAddress']['state'],
                    country = data['shippingAddress']['country'],
                    zip_code = data['shippingAddress']['zip_code'],
                    other_details = data['shippingAddress']['other_details']
                )
                
                order.shipping_address = shipping
                
                order.save()
                
            # (3) Create order items and set order to orderItem relationship:
            for i in orderItems:
                product = Product.objects.get(pk = i['product'])
                
                OrderItem.objects.create(
                    order = order,
                    product = product,
                    name = product.name,
                    qty = i['qty'],
                    price = i['price']
                )
            
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        
        except Exception as e:
            message = {'detail':'Failed to create order: {}'.format(str(e))}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)



# Get an order by Id:
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    
    user = request.user
    try:
        order = Order.objects.get(id=pk)
        
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this order.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist.'})
    
    
# Update order:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrder(request, pk):
    order = Order.objects.get(id=pk) 
    
    data = request.data
    
    order.client = data['client'],
    order.payment_method = data['payment_method'],
    order.gross_price = data['gross_price'],
    order.discount = data['discount'],
    order.shipping_price= data['shipping_price'],
    order.total_price = data['total_price'],
    order.other_details = data['other_details'],

    if 'shippingAddress' in data:
        
        shipping = ShippingAddress.objects.get(id=order.shipping_address)
        
        shipping.street = data['shippingAddress']['street']
        shipping.st_num = data['shippingAddress']['st_num']
        shipping.city = data['shippingAddress']['city']
        shipping.state= data['shippingAddress']['state']
        shipping.country = data['shippingAddress']['country']
        shipping.zip_code = data['shippingAddress']['zip_code']
        shipping.other_details = data['shippingAddress']['other_details']
        
        shipping.save()
        
    order.save()
    
    serializer = ProductSerializer(order, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(id=pk)

    order.is_paid = True
    order.paid_on = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(id=pk)

    order.is_delivered = True
    order.delivered_on = datetime.now()
    order.save()

    return Response('Order was delivered.')




# Delete order:
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteOrder(request, pk):
    orderForDeletion = Order.objects.get(id=pk)
    orderForDeletion.delete()
    return Response('Order was deleted.')



# PAYMENT VIEWS: 

# Get all payments: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllPayments(request):
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get user payments (without filtering by order or client): 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserPayments(request):
    user = request.user
    payments = Payment.objects.filter(user=user)
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)


# Get a payment by Id:
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPaymentById(request, pk):
    
    user = request.user
    try:
        payment = Payment.objects.get(id=pk)
        
        if user.is_staff or payment.user == user:
            serializer = PaymentSerializer(payment, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this payment.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Payment does not exist.'})
    
    
# Create payment:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPayment(request):

    user = request.user
    data = request.data
    
    try:
        payment = Payment.objects.create(
            
            user = user,
            client = data['client'],
            order = data['order'],
            amount = data['amount'],
            paid_on = data['paid_on'],
            receipt_image = data['receipt_image']
        )
        
        
        serializer = PaymentSerializer(payment, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'Payment already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update payment:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePayment(request, pk):
    payment = Payment.objects.get(id=pk) 
    
    data = request.data
    
    payment.client = data['client']
    payment.order = data['order']
    payment.amount = data['amount']
    payment.paid_on = data['paid_on']
    payment.receipt_image = data['receipt_image']

        
    payment.save()
    
    serializer = PaymentSerializer(payment, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


# Delete payment:
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePayment(request, pk):
    paymentForDeletion = Payment.objects.get(id=pk)
    paymentForDeletion.delete()
    return Response('Payment was deleted.')


# DISCOUNT VIEWS: 

# Get all discounts: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllDiscounts(request):
    discounts = Discount.objects.all()
    serializer = DiscountSerializer(discounts, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get user discounts (without filtering by order or client): 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserDiscounts(request):
    user = request.user
    discounts = Discount.objects.filter(user=user)
    serializer = DiscountSerializer(discounts, many=True)
    return Response(serializer.data)


# Get a discount by Id:
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDiscountById(request, pk):
    
    user = request.user
    try:
        discount = Discount.objects.get(id=pk)
        
        if user.is_staff or discount.user == user:
            serializer = DiscountSerializer(discount, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this discount.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Discount does not exist.'})
    
    
# Create discount:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createDiscount(request):

    user = request.user
    data = request.data
    
    try:
        discount = Discount.objects.create(
            
            user = user,
            name = data['name'],
            percentage = data['percentage'],
            conditions = data['conditions']
        )
        
        
        serializer = DiscountSerializer(discount, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'Discount already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update discount:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateDiscount(request, pk):
    discount = Discount.objects.get(id=pk) 
    
    data = request.data
    
    discount.name = data['name']
    discount.percentage = data['percentage']
    discount.conditions = data['conditions']

        
    discount.save()
    
    serializer = DiscountSerializer(discount, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


# Delete discount:
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteDiscount(request, pk):
    discountForDeletion = Discount.objects.get(id=pk)
    discountForDeletion.delete()
    return Response('Discount was deleted.')