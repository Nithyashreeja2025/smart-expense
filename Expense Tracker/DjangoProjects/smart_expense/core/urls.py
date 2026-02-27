from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('expenses/', views.expenses, name='expenses'),
    path('reports/', views.reports, name='reports'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('budget/', views.budget, name='budget'),
    path('history/', views.history, name='history'),
]
