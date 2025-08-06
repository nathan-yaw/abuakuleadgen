from django.urls import path
from .views import FindLeadsView, LoadTablesView

urlpatterns = [
    path('search/', FindLeadsView.as_view(), name='find_leads'),
    path('load_table/', LoadTablesView.as_view(), name='load_tables'),
]