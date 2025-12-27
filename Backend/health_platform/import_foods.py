import os
import django
import csv

# 1. Bootstrap Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "health_platform.settings")
django.setup()

from django.db import connection
connection.ensure_connection() 

# 2. Import model AFTER setup
from api.models import Food

# 3. Helpers
def to_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None

def to_list(value):
    if not value:
        return []
    return [v.strip() for v in value.replace(";", ",").split(",") if v.strip()]

# 4. Read CSV and build objects
foods = []

with open("data/Food.csv", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        foods.append(
            Food(
                name=row.get("Food"),

                region=to_list(row.get("Region")),
                type=to_list(row.get("Type")),
                category=to_list(row.get("Category")),
                allergy=to_list(row.get("Allergy")),

                serving=row.get("Serving"),
                total_weight_g=to_float(row.get("Total Weight (gms)")),

                energy_kcal=to_float(row.get("Energy(kcal)")),
                proteins_g=to_float(row.get("Proteins")),
                carbohydrates_g=to_float(row.get("Carbohydrates")),
                fats_g=to_float(row.get("Fats")),
                fiber_g=to_float(row.get("Fiber")),

                carbon_footprint_kg=to_float(row.get("Carbon Footprint(kg CO2e)")),
                ingredients=row.get("Ingredients"),
            )
        )

# 5. Bulk insert
Food.objects.bulk_create(foods, batch_size=10)

print(f"Imported {len(foods)} foods successfully")
