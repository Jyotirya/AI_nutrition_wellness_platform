from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import SimpleListFilter

from .models import UserDetails, Food

# Helper to safely flatten JSON list fields that store strings
def _collect_unique_values(qs, field):
    seen = set()
    for item in qs.values_list(field, flat=True):
        if isinstance(item, list):
            for val in item:
                if isinstance(val, str):
                    seen.add(val)
        elif isinstance(item, str):
            seen.add(item)
    return sorted(seen)


class JsonArrayFilter(SimpleListFilter):
    """
    Custom filter for JSONField that stores a list of strings.
    Uses simple substring match (`icontains`) to stay SQLite-safe.
    """

    title = ""
    parameter_name = ""
    field_name = ""

    def lookups(self, request, model_admin):
        values = _collect_unique_values(model_admin.get_queryset(request), self.field_name)
        return [(v, v) for v in values]

    def queryset(self, request, queryset):
        value = self.value()
        if value:
            # SQLite JSONField lacks 'contains'; fallback to substring search
            return queryset.filter(**{f"{self.field_name}__icontains": value})
        return queryset


class RegionFilter(JsonArrayFilter):
    title = "region"
    parameter_name = "region"
    field_name = "region"


class CategoryFilter(JsonArrayFilter):
    title = "category"
    parameter_name = "category"
    field_name = "category"


class TypeFilter(JsonArrayFilter):
    title = "type"
    parameter_name = "type"
    field_name = "type"


class AllergyFilter(JsonArrayFilter):
    title = "allergy"
    parameter_name = "allergy"
    field_name = "allergy"


# Register your models here.
admin.site.site_header = "Health Platform Admin"
admin.site.index_title = "Health Platform Admin Portal"
admin.site.site_title = "Health Platform Admin"
admin.site.register(UserDetails)


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "region", "energy_kcal")
    search_fields = ("name", "ingredients")
    # Use custom filters that work with JSON list fields
    list_filter = (RegionFilter, CategoryFilter, TypeFilter, AllergyFilter)