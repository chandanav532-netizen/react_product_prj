from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=("id","name","price","qty")
    search_fields=("name",)

#localhost:8000/api/products
