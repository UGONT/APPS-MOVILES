from django.urls import path
from .views import lista_usuarios, datos_usuario

urlpatterns = [
    path('lista_usuarios/', lista_usuarios, name='lista_usuarios'),
    path('datos_usuario/<id>', datos_usuario, name='datos_usuario'),
    
]