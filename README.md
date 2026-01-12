# AI Nutrition & Wellness Platform (Nutrigo)

An end-to-end **AI-powered nutrition and wellness platform** that generates **personalized weekly meal plans** based on user health data, fitness activity, dietary preferences, and goals. The system combines **rule-based intelligence**, **data-driven macros computation**, and a **modern full-stack architecture** to deliver a scalable, real-world health-tech solution.

---

## 🚀 Features

### 🔐 Authentication & User Management
- JWT-based authentication (access + refresh tokens)
- Secure login, signup, token refresh, and logout flows
- Persistent sessions with automatic token rotation

### 🧠 Smart Onboarding System
- Multi-step onboarding flow capturing:
  - Age, gender, height, weight, body fat %
  - Activity level, workout type & frequency
  - Dietary preferences, allergies, cuisines
  - Nutrition and fitness goals
- Progressive onboarding with backend state synchronization

### 🍽️ AI-Driven Meal Planning Engine
- Personalized **weekly & daily meal plans**
- Dynamic calorie & macro computation using:
  - BMR (Mifflin–St Jeor)
  - NEAT & exercise-based activity multipliers
  - Goal-aware adjustments (weight loss / muscle gain / diabetes control)
- Intelligent meal splitting (1–5 meals/day with snack handling)
- Variety enforcement using repetition penalty tracking
- Cuisine, allergy, and diet-type filtering

### 📊 Nutrition-Aware Data Models
- Hierarchical planning:
  - WeeklyPlan → DailyPlan → Meal → MealItem
- Auto-calculated calories and macros at every level
- Real-time macro recalculation on meal edits

### ⚛️ Modern Frontend Experience
- React + TypeScript SPA
- Context-driven onboarding state management
- Protected routes and dashboard views
- Axios interceptors for auth handling
- Clean, scalable component architecture

---

## 🧩 Tech Stack

### Backend
- **Django**
- **Django REST Framework**
- **JWT Authentication**
- SQLite (JSONField-based food filtering)
- Rule-based recommendation engine

### Frontend
- **React**
- **TypeScript**
- **React Router**
- **Axios**
- Context API for global onboarding state

---


---

## 🗃️ Core Data Models

- `UserDetails` – Health, lifestyle, and onboarding state
- `Food` – Nutritional data, regions, allergens, categories
- `WeeklyPlan` – Target macros & weekly structure
- `DailyPlan` – Per-day calorie/macro breakdown
- `Meal` – Meal-level macro aggregation
- `MealItem` – Food quantity mapping

---

## ⚙️ Setup Instructions

### Backend
```bash
git clone https://github.com/Jyotirya/AI_nutrition_wellness_platform.git
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
