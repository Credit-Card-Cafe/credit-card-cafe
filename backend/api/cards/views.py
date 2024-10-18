from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import Card
from .serializers import CardSerializer

@csrf_exempt
def get_cards(request):
    if request.method != "GET":
        return HttpResponse(status=404)

    cards = Card.objects.all()
    cards_serializer = CardSerializer(cards, many=True)
    return JsonResponse(cards_serializer.data, safe=False)
