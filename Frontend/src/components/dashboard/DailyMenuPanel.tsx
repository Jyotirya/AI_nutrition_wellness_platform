import { useEffect, useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { FlippableMealCard } from './FlippableMealCard';
import { getWeeklyPlans, regenerateDailyPlan, getProfile } from '@/libapis/api';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface MealData {
  id: number;
  type: string;
  name: string;
  calories: number;
  time: string;
  ingredients: string[];
}

const defaultMealTimes: Record<string, string> = {
  'Breakfast': '8:00 AM',
  'Lunch': '12:30 PM',
  'Snack': '3:00 PM',
  'Dinner': '7:00 PM',
};

export function DailyMenuPanel() {
  const [dailyMeals, setDailyMeals] = useState<MealData[]>([]);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Get current day index (0=Monday, 6=Sunday)
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7; // Convert JS Sunday=0 to Monday=0
  const currentDayName = daysOfWeek[currentDayIndex];

  const loadTodaysMeals = async () => {
    try {
      const { data: plans } = await getWeeklyPlans();
      const activePlan = plans[0];
      
      if (activePlan && activePlan.days) {
        const todayPlan = activePlan.days.find((d: any) => d.day === currentDayIndex);
        if (todayPlan && todayPlan.meals) {
          const meals: MealData[] = todayPlan.meals.map((meal: any, idx: number) => {
            const foodNames = (meal.items || [])
              .map((item: any) => item.food?.name)
              .filter(Boolean);
            const ingredients = (meal.items || [])
              .flatMap((item: any) => {
                // Try to extract ingredients from food, or use food name
                const food = item.food;
                if (food?.ingredients) {
                  return food.ingredients.split(';').map((i: string) => i.trim()).slice(0, 5);
                }
                return [food?.name || 'Unknown'];
              })
              .slice(0, 5);
            
            return {
              id: meal.id || idx + 1,
              type: meal.meal_type,
              name: foodNames.length > 0 
                ? (foodNames.length > 1 ? foodNames.slice(0, 2).join(' + ') : foodNames[0])
                : meal.meal_type,
              calories: meal.calories || 0,
              time: defaultMealTimes[meal.meal_type] || '12:00 PM',
              ingredients: ingredients.length > 0 ? ingredients : ['No ingredients listed'],
            };
          });
          setDailyMeals(meals);
        }
      }
    } catch (err) {
      console.error('Failed to load daily meals', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserName = async () => {
    try {
      const { data: profile } = await getProfile();
      const user = profile.user || {};
      const name = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'there';
      setUserName(name);
    } catch (err) {
      console.warn('Could not load user name', err);
      setUserName('there');
    }
  };

  useEffect(() => {
    loadTodaysMeals();
    loadUserName();
  }, []);

  const handleRegenerateDaily = async () => {
    setRegenerating(true);
    try {
      await regenerateDailyPlan(currentDayIndex);
      await loadTodaysMeals();
    } catch (err) {
      console.error('Failed to regenerate daily plan', err);
    } finally {
      setRegenerating(false);
    }
  };

  const totalCalories = dailyMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const greetingName = userName || 'there';

  if (loading) {
    return (
      <main className="flex-1 lg:ml-64 bg-white overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 md:p-8 lg:p-12">
          <p className="text-gray-600">Loading today's meal plan...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 lg:ml-64 bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 md:p-8 lg:p-12">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:4xl lg:text-5xl mb-2">Hello, {greetingName}!</h1>
          <p className="text-base md:text-lg text-gray-600">Let&apos;s begin our journey to better health today</p>
        </div>

        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-3">{currentDayName}&apos;s Meal Plan</h2>
          <p className="text-lg md:text-xl text-gray-600">Total: {totalCalories} kcal</p>
        </div>

        {dailyMeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No meal plan for today yet.</p>
            <button 
              onClick={handleRegenerateDaily}
              disabled={regenerating}
              className="px-6 py-3 bg-gradient-to-r from-[#85C872] to-[#6AB854] text-white rounded-xl hover:shadow-lg transition"
            >
              {regenerating ? 'Generating...' : 'Generate Today\'s Plan'}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
              {dailyMeals.map((meal) => (
                <FlippableMealCard 
                  key={meal.id} 
                  type={meal.type}
                  name={meal.name}
                  ingredients={meal.ingredients}
                  calories={meal.calories}
                  time={meal.time}
                />
              ))}
            </div>

            <button 
              onClick={handleRegenerateDaily}
              disabled={regenerating}
              className="w-full max-w-md mx-auto block py-4 bg-gradient-to-r from-[#85C872] to-[#6AB854] text-white rounded-2xl hover:shadow-lg transition flex items-center justify-center gap-3 text-lg disabled:opacity-70"
            >
              <Sparkles className={`w-6 h-6 ${regenerating ? 'animate-spin' : ''}`} />
              {regenerating ? 'Regenerating...' : 'Generate New Daily Plan'}
            </button>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mt-12 max-w-4xl mx-auto">
          <div className="p-6 bg-[#F9D867]/10 rounded-2xl border border-[#F9D867]/30">
            <h3 className="text-xl mb-4">Daily Summary</h3>
            <div className="space-y-3 text-base">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Calories</span>
                <span className="font-medium">{totalCalories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meals</span>
                <span className="font-medium">{dailyMeals.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg per meal</span>
                <span className="font-medium">{dailyMeals.length > 0 ? Math.round(totalCalories / dailyMeals.length) : 0} kcal</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#85C872]/10 rounded-2xl border border-[#85C872]/30">
            <h3 className="text-xl mb-4">Tips for Today</h3>
            <ul className="space-y-3 text-base text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-[#85C872] mt-1 text-xl">•</span>
                <span>Drink at least 8 glasses of water throughout the day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#85C872] mt-1 text-xl">•</span>
                <span>Take a 10-minute walk after each meal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#85C872] mt-1 text-xl">•</span>
                <span>Prepare tomorrow&apos;s lunch in advance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}