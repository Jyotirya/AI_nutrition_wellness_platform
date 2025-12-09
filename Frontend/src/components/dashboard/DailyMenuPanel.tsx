import { RefreshCw, Sparkles } from 'lucide-react';

const dailyMeals = [
  {
    id: 1,
    type: 'Breakfast',
    name: 'Acai Bowl with Berries',
    calories: 320,
    time: '8:00 AM',
  },
  {
    id: 2,
    type: 'Lunch',
    name: 'Grilled Chicken Salad',
    calories: 450,
    time: '12:30 PM',
  },
  {
    id: 3,
    type: 'Snacks',
    name: 'Greek Yogurt & Almonds',
    calories: 180,
    time: '3:00 PM',
  },
  {
    id: 4,
    type: 'Dinner',
    name: 'Grilled Salmon & Veggies',
    calories: 520,
    time: '7:00 PM',
  },
];

export function DailyMenuPanel() {
  const totalCalories = dailyMeals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <aside className="w-80 bg-white border-l border-gray-200 fixed right-0 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Daily Menu</h2>
          <div className="text-sm text-gray-600">{totalCalories} kcal</div>
        </div>

        <div className="space-y-4 mb-6">
          {dailyMeals.map((meal) => (
            <div
              key={meal.id}
              className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{meal.type}</div>
                  <h3 className="text-sm mb-1">{meal.name}</h3>
                  <div className="text-xs text-gray-600">{meal.time}</div>
                </div>
                <button className="text-gray-400 hover:text-[#85C872] transition">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#85C872]">{meal.calories} kcal</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-[#85C872] to-[#6AB854] text-white rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          Generate New Daily Plan
        </button>

        <div className="mt-6 p-4 bg-[#F9D867]/10 rounded-xl border border-[#F9D867]/30">
          <h3 className="text-sm mb-2">Daily Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Calories</span>
              <span>{totalCalories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meals</span>
              <span>4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg per meal</span>
              <span>{Math.round(totalCalories / dailyMeals.length)} kcal</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#85C872]/10 rounded-xl border border-[#85C872]/30">
          <h3 className="text-sm mb-2">Tips for Today</h3>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#85C872] mt-0.5">•</span>
              <span>Drink at least 8 glasses of water throughout the day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#85C872] mt-0.5">•</span>
              <span>Take a 10-minute walk after each meal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#85C872] mt-0.5">•</span>
              <span>Prepare tomorrow&apos;s lunch in advance</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
