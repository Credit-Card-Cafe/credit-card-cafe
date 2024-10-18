from django.urls import path, include
from cards import views

urlpatterns = [
        path("cards/", views.get_cards)
]
