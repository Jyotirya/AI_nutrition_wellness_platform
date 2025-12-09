import { useState } from 'react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Calendar, 
  Book, 
  Dumbbell, 
  Activity, 
  MessageCircle, 
  ShoppingCart, 
  Settings,
  Search,
  Bell,
  User,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MoreVertical
} from 'lucide-react';
import { Sidebar } from './shared/Sidebar';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const weeklyMeals = {
  Monday: {
    breakfast: { name: 'Oatmeal with Berries', calories: 340, protein: 12, carbs: 58, fats: 8 },
    lunch: { name: 'Grilled Chicken Salad', calories: 450, protein: 38, carbs: 24, fats: 22 },
    snacks: { name: 'Greek Yogurt & Almonds', calories: 180, protein: 15, carbs: 12, fats: 8 },
    dinner: { name: 'Baked Salmon & Veggies', calories: 520, protein: 42, carbs: 28, fats: 26 },
  },
  Tuesday: {
    breakfast: { name: 'Protein Smoothie Bowl', calories: 380, protein: 28, carbs: 48, fats: 12 },
    lunch: { name: 'Quinoa Buddha Bowl', calories: 420, protein: 18, carbs: 52, fats: 16 },
    snacks: { name: 'Apple & Peanut Butter', calories: 200, protein: 6, carbs: 26, fats: 10 },
    dinner: { name: 'Turkey Meatballs & Pasta', calories: 540, protein: 36, carbs: 58, fats: 18 },
  },
  Wednesday: {
    breakfast: { name: 'Avocado Toast & Eggs', calories: 420, protein: 22, carbs: 38, fats: 22 },
    lunch: { name: 'Tuna Poke Bowl', calories: 480, protein: 34, carbs: 46, fats: 18 },
    snacks: { name: 'Protein Bar', calories: 190, protein: 20, carbs: 24, fats: 7 },
    dinner: { name: 'Chicken Stir Fry', calories: 490, protein: 40, carbs: 44, fats: 16 },
  },
  Thursday: {
    breakfast: { name: 'Acai Bowl', calories: 360, protein: 14, carbs: 62, fats: 10 },
    lunch: { name: 'Mediterranean Wrap', calories: 440, protein: 26, carbs: 48, fats: 18 },
    snacks: { name: 'Trail Mix', calories: 210, protein: 8, carbs: 22, fats: 12 },
    dinner: { name: 'Shrimp Tacos', calories: 460, protein: 32, carbs: 42, fats: 20 },
  },
  Friday: {
    breakfast: { name: 'Pancakes & Berries', calories: 400, protein: 16, carbs: 64, fats: 12 },
    lunch: { name: 'Sushi Platter', calories: 520, protein: 28, carbs: 68, fats: 14 },
    snacks: { name: 'Hummus & Veggies', calories: 160, protein: 6, carbs: 18, fats: 8 },
    dinner: { name: 'Grilled Steak & Potatoes', calories: 580, protein: 46, carbs: 42, fats: 24 },
  },
  Saturday: {
    breakfast: { name: 'French Toast', calories: 440, protein: 18, carbs: 58, fats: 16 },
    lunch: { name: 'Caesar Salad with Chicken', calories: 460, protein: 36, carbs: 22, fats: 26 },
    snacks: { name: 'Smoothie', calories: 220, protein: 12, carbs: 38, fats: 6 },
    dinner: { name: 'Pizza Margherita', calories: 560, protein: 24, carbs: 68, fats: 22 },
  },
  Sunday: {
    breakfast: { name: 'Eggs Benedict', calories: 480, protein: 26, carbs: 42, fats: 24 },
    lunch: { name: 'Veggie Burger & Sweet Potato', calories: 500, protein: 22, carbs: 64, fats: 18 },
    snacks: { name: 'Dark Chocolate & Nuts', calories: 240, protein: 6, carbs: 24, fats: 16 },
    dinner: { name: 'Pasta Primavera', calories: 520, protein: 18, carbs: 78, fats: 16 },
  },
};

export function MealPlan() {
  const [currentWeek, setCurrentWeek] = useState('Week of Dec 9-15, 2024');

  const calculateDayMacros = (day: keyof typeof weeklyMeals) => {
    const meals = weeklyMeals[day];
    return {
      calories: meals.breakfast.calories + meals.lunch.calories + meals.snacks.calories + meals.dinner.calories,
      protein: meals.breakfast.protein + meals.lunch.protein + meals.snacks.protein + meals.dinner.protein,
      carbs: meals.breakfast.carbs + meals.lunch.carbs + meals.snacks.carbs + meals.dinner.carbs,
      fats: meals.breakfast.fats + meals.lunch.fats + meals.snacks.fats + meals.dinner.fats,
    };
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      <Sidebar activePage="Meal Plan" />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl mb-1">Meal Plan</h1>
                <p className="text-gray-600">Your personalized weekly nutrition schedule</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search meals..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl w-64 focus:ring-2 focus:ring-[#85C872] focus:border-transparent outline-none"
                  />
                </div>
                <button className="relative p-2 hover:bg-gray-100 rounded-xl transition">
                  <Bell className="w-6 h-6 text-gray-600" />
                </button>
                <button className="w-10 h-10 bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Week Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white rounded-lg border border-gray-200 transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl">{currentWeek}</h2>
              <button className="p-2 hover:bg-white rounded-lg border border-gray-200 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#85C872] to-[#6AB854] text-white rounded-xl hover:shadow-lg transition">
              <Sparkles className="w-5 h-5" />
              Regenerate Plan
            </button>
          </div>

          {/* Weekly Grid */}
          <div className="grid grid-cols-7 gap-4">
            {daysOfWeek.map((day) => {
              const dayMacros = calculateDayMacros(day as keyof typeof weeklyMeals);
              const meals = weeklyMeals[day as keyof typeof weeklyMeals];

              return (
                <div key={day} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  {/* Day Header */}
                  <div className="bg-gradient-to-r from-[#85C872] to-[#6AB854] text-white p-4">
                    <div className="text-sm opacity-90">{day.substring(0, 3)}</div>
                    <div className="text-xs opacity-75 mt-1">{dayMacros.calories} kcal</div>
                  </div>

                  {/* Meals */}
                  <div className="p-3 space-y-2">
                    {/* Breakfast */}
                    <div className="bg-gradient-to-br from-orange-50 to-white p-3 rounded-xl border border-orange-100">
                      <div className="text-xs text-gray-500 mb-1">Breakfast</div>
                      <h4 className="text-sm mb-2">{meals.breakfast.name}</h4>
                      <div className="text-xs text-gray-600 mb-2">{meals.breakfast.calories} kcal</div>
                      <button className="w-full py-1 text-xs border border-gray-200 rounded-lg hover:border-[#85C872] transition flex items-center justify-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        Swap
                      </button>
                    </div>

                    {/* Lunch */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-3 rounded-xl border border-blue-100">
                      <div className="text-xs text-gray-500 mb-1">Lunch</div>
                      <h4 className="text-sm mb-2">{meals.lunch.name}</h4>
                      <div className="text-xs text-gray-600 mb-2">{meals.lunch.calories} kcal</div>
                      <button className="w-full py-1 text-xs border border-gray-200 rounded-lg hover:border-[#85C872] transition flex items-center justify-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        Swap
                      </button>
                    </div>

                    {/* Snacks */}
                    <div className="bg-gradient-to-br from-yellow-50 to-white p-3 rounded-xl border border-yellow-100">
                      <div className="text-xs text-gray-500 mb-1">Snacks</div>
                      <h4 className="text-sm mb-2">{meals.snacks.name}</h4>
                      <div className="text-xs text-gray-600 mb-2">{meals.snacks.calories} kcal</div>
                      <button className="w-full py-1 text-xs border border-gray-200 rounded-lg hover:border-[#85C872] transition flex items-center justify-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        Swap
                      </button>
                    </div>

                    {/* Dinner */}
                    <div className="bg-gradient-to-br from-purple-50 to-white p-3 rounded-xl border border-purple-100">
                      <div className="text-xs text-gray-500 mb-1">Dinner</div>
                      <h4 className="text-sm mb-2">{meals.dinner.name}</h4>
                      <div className="text-xs text-gray-600 mb-2">{meals.dinner.calories} kcal</div>
                      <button className="w-full py-1 text-xs border border-gray-200 rounded-lg hover:border-[#85C872] transition flex items-center justify-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        Swap
                      </button>
                    </div>
                  </div>

                  {/* Macro Summary */}
                  <div className="border-t border-gray-200 p-3 bg-gray-50">
                    <div className="text-xs text-gray-500 mb-2">Daily Macros</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-[#85C872]">{dayMacros.protein}g</div>
                        <div className="text-gray-500">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#F9D867]">{dayMacros.carbs}g</div>
                        <div className="text-gray-500">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#A5B4FC]">{dayMacros.fats}g</div>
                        <div className="text-gray-500">Fats</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
