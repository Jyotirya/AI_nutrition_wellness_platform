def calculate_bmr_tdee(profile):
    # Mifflin-St Jeor Equation
    # Men: (10 × weight) + (6.25 × height) - (5 × age) + 5
    # Women: (10 × weight) + (6.25 × height) - (5 × age) - 161
    
    val = (10 * profile.weight_kg) + (6.25 * profile.height_cm) - (5 * profile.age)
    
    if profile.gender == 'M':
        bmr = val + 5
    else:
        bmr = val - 161

    tdee = bmr * profile.activity_level
    return int(bmr), int(tdee)

def calculate_target_calories(tdee, goal):
    if goal == 'LOSE':
        return tdee - 500  # Deficit
    elif goal == 'GAIN':
        return tdee + 300  # Surplus
    return tdee

def calculate_macros(target_calories):
    protein_cals = target_calories * 0.35
    carbs_cals = target_calories * 0.40
    fats_cals = target_calories * 0.25

    return {
        "protein_g": int(protein_cals / 4), # 4 cal/g
        "carbs_g": int(carbs_cals / 4),     # 4 cal/g
        "fats_g": int(fats_cals / 9)        # 9 cal/g
    }