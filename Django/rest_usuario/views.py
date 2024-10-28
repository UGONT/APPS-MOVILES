from django.shortcuts import render
from urllib import response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from .models import Usuario
from .serializers import UsuarioSerializer
# Create your views here.

@csrf_exempt
@api_view(['GET','POST'])
def lista_usuarios(request):
    #Lista usuarios
    if request.method == 'GET':
        usuario = Usuario.objects.all()
        serializer = UsuarioSerializer(usuario,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        
        """ data = JSONParser().parse(request) """
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("user")
            if Usuario.objects.filter(user=username).exists():
                return Response({"error": "El usuario ya existe."}, status=status.HTTP_400_BAD_REQUEST)    
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:          
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

@api_view(['GET','PUT','DELETE'])
def datos_usuario(request,id):
    try:
        usuario = Usuario.objects.get(id=id)
    except Usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)
    if request.method =='PUT':
        data = JSONParser().parse(request)
        serializer = UsuarioSerializer(usuario,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        usuario.delete()
        usuario = Usuario.objects.all()
        serializer = UsuarioSerializer(usuario,many=True)
        return Response(serializer.data,status=status.HTTP_204_NO_CONTENT)