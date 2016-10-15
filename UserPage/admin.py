from django.contrib import admin
from UserPage.models import UserStorageInfo
# Register your models here.
@admin.register(UserStorageInfo)
class AuthorAdmin(admin.ModelAdmin):
    pass