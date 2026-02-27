from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def expenses(request):
    return render(request, 'expenses.html')

def reports(request):
    return render(request, 'reports.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def budget(request):
    return render(request, 'budget.html')

def history(request):
    return render(request, 'history.html')