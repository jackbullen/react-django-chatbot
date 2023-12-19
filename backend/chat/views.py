from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer
from datetime import datetime

from .AI import chat

def handler(request):
    pass

class MessageView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            timestamp = datetime.now()
            serializer.save(timestamp=timestamp)
            
            user_input = serializer.validated_data['text']
            prompt = f""
            
            response = chat(user_input, 0)
            
            serializer.validated_data['response'] = response

            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors)
