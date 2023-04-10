from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from Base.serializers import UserSerializer, UserSerializerWithToken, SupplierSerializer, ClientSerializer, ShippingAddressSerializer
from Base.models import Supplier, Client, ShippingAddress

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Importamos metodo para hashear la password:
from django.contrib.auth.hashers import make_password
# Importamos esto para pasar las respuestas HTTP (ej. 404)
from rest_framework import status

# Create your views here.

# Esto es para el login del usuario:
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# USER VIEWS: 

# Get all users: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get user profile: 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user  
    serializer = UserSerializer(user, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get user by ID: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)



# Register user:
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['username'],
            email= data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'User with this username or email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

# Update user profile:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user  
    # Usamos el UserSerializerWithToken porque necesitamos que nos devuelva un Token nuevo:
    serializer = UserSerializerWithToken(user, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    data = request.data
    
    user.first_name = data['name']
    user.username = data['username'] 
    user.email = data['email']
    
    if data['password'] != '':
        user.password = make_password(data['password'])
        
    user.save()
    
    return Response(serializer.data)


# Update user:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk) 
    
    data = request.data
    
    user.first_name = data['name']
    user.username = data['username'] 
    user.email = data['email']
    user.is_staff = data['isAdmin']

        
    user.save()
    
    serializer = UserSerializer(user, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


# Delete user:
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted.')



# SUPPLIER VIEWS: 

# Get all suppliers: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllSuppliers(request):
    suppliers = Supplier.objects.all()
    serializer = SupplierSerializer(suppliers, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get all suppliers: 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserSuppliers(request):
    user = request.user
    suppliers = Supplier.objects.filter(user=user) # Si esto no funciona usar: request.data['user']
    serializer = SupplierSerializer(suppliers, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Create supplier:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSupplier(request):
    user = request.user
    data = request.data
    try:
        supplier = Supplier.objects.create(
            user = user,
            name = data['name'],
            email= data['email'],
            phone = data['phone'],
            address = data['address'],
            other_details = data['other_details'],

        )
        serializer = SupplierSerializer(supplier, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'Supplier already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update supplier:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSupplier(request, pk):
    supplier = Supplier.objects.get(id=pk) 
    
    data = request.data
    
    supplier.name = data['name']
    supplier.email = data['email']
    supplier.phone = data['phone'] 
    supplier.address = data['address']
    supplier.other_details = data['other_details']

        
    supplier.save()
    
    serializer = SupplierSerializer(supplier, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


# Delete supplier:
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSupplier(request, pk):
    supplierForDeletion = Supplier.objects.get(id=pk)
    supplierForDeletion.delete()
    return Response('Supplier was deleted.')



# CLIENT VIEWS: 

# Get all clients: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllClients(request):
    clients = Client.objects.all()
    serializer = ClientSerializer(clients, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get user clients: 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserClients(request):
    user = request.user
    suppliers = Client.objects.filter(user=user) # Si esto no funciona usar: request.data['user']
    serializer = SupplierSerializer(suppliers, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Create supplier:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createClient(request):
    user = request.user
    data = request.data
    try:
        supplier = Client.objects.create(
            user = user,
            name = data['name'],
            first_name = data['first_name'],
            last_name = data['last_name'],
            email= data['email'],
            phone = data['phone'],
            other_details = data['other_details'],
        )
        
        # La ShippingAddress la voy a agregar aparte (Quizás no la sabe al momento de crear el cliente)
        
        serializer = SupplierSerializer(supplier, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'Supplier already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update client:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateClient(request, pk):
    client = Client.objects.get(id=pk) 
    
    data = request.data
    
    client.name = data['name']
    client.first_name = data['first_name']
    client.last_name = data['last_name']
    client.email = data['email']
    client.phone = data['phone'] 
    client.other_details = data['other_details']

        
    client.save()
    
    serializer = ClientSerializer(client, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


# Delete client:
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteClient(request, pk):
    clientForDeletion = Client.objects.get(id=pk)
    clientForDeletion.delete()
    return Response('Client was deleted.')