from django.shortcuts import render
from rest_framework import generics
from 

# Create your views here.

class NotificationListApiView(generics.ListAPIView):
    serializer_class = 