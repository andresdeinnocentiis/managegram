from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from Base.serializers import ProductSerializer, BrandSerializer, CategorySerializer
from Base.models import Supplier, Product, Brand, Category

# Importamos esto para pasar las respuestas HTTP (ej. 404)
from rest_framework import status


# PRODUCT VIEWS: 

# Get all products: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get supplier's products: 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSupplierProducts(request):
    supplier = request.data['supplier']
    products = Product.objects.filter(supplier=supplier)
    serializer = ProductSerializer(products, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Create product:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):

    data = request.data
    
    try:
        product = Product.objects.create(
            
            supplier = data['supplier'],
            product_code = data['product_code'],
            name = data['name'],
            brand = data['brand'],
            category= data['category'],
            description = data['description'],
            price = data['price'],
        )
        
        
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'Product already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update product:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request, pk):
    product = Product.objects.get(id=pk) 
    
    data = request.data
    
    product.supplier = data['supplier']
    product.product_code = data['product_code']
    product.name = data['name']
    product.brand = data['brand']
    product.category = data['category'] 
    product.description = data['description'] 
    product.price = data['price']

        
    product.save()
    
    serializer = ProductSerializer(product, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


# Delete product:
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request, pk):
    productForDeletion = Product.objects.get(id=pk)
    productForDeletion.delete()
    return Response('Product was deleted.')




# BRAND VIEWS: 

# Get all brands: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllBrands(request):
    brands = Brand.objects.all()
    serializer = BrandSerializer(brands, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get user brands: 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserBrands(request):
    user = request.user
    brands = Brand.objects.filter(user=user)
    serializer = BrandSerializer(brands, many=True)
    return Response(serializer.data)


# Get a brand by Id:
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBrandById(request, pk):
    
    user = request.user
    try:
        brand = Brand.objects.get(id=pk)
        
        if user.is_staff or brand.user == user:
            serializer = BrandSerializer(brand, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this brand.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Brand does not exist.'})
    
    
# Create brand:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBrand(request):

    user = request.user
    data = request.data
    
    try:
        brand = Brand.objects.create(
            
            user = user,
            name = data['name']
        )
        
        
        serializer = BrandSerializer(brand, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'Brand already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update discount:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBrand(request, pk):
    brand = Brand.objects.get(id=pk) 
    
    data = request.data
    
    brand.name = data['name']

        
    brand.save()
    
    serializer = BrandSerializer(brand, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


# Delete brand:
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBrand(request, pk):
    brandForDeletion = Brand.objects.get(id=pk)
    brandForDeletion.delete()
    return Response('Brand was deleted.')



# CATEGORY VIEWS: 

# Get all categories: 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    return Response(serializer.data)


# Get user categories: 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserCategories(request):
    user = request.user
    categories = Category.objects.filter(user=user)
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# Get a category by Id:
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBrandById(request, pk):
    
    user = request.user
    try:
        category = Category.objects.get(id=pk)
        
        if user.is_staff or category.user == user:
            serializer = CategorySerializer(category, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this category.'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Category does not exist.'})
    
    
# Create category:
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCategory(request):

    user = request.user
    data = request.data
    
    try:
        category = Category.objects.create(
            
            user = user,
            name = data['name']
        )
        
        
        serializer = CategorySerializer(category, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'Category already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Update discount:
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCategory(request, pk):
    category = Category.objects.get(id=pk) 
    
    data = request.data
    
    category.name = data['name']

        
    category.save()
    
    serializer = CategorySerializer(category, many=False) #Siempre hay que serializar xq no se puede pasar un QuerySet object al frontend, solo se puede pasar un JSON
    
    return Response(serializer.data)


# Delete category:
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCategory(request, pk):
    categoryForDeletion = Category.objects.get(id=pk)
    categoryForDeletion.delete()
    return Response('Category was deleted.')