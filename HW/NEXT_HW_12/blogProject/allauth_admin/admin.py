from django.contrib import admin
from allauth.socialaccount.models import SocialApp

@admin.register(SocialApp)
class SocialAppAdmin(admin.ModelAdmin):
    list_display = ('provider', 'name', 'client_id')
    search_fields = ('provider', 'name')
