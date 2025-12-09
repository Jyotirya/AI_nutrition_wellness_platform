import { useState } from 'react';
import { 
  Search,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  UtensilsCrossed,
  Dumbbell,
  Droplet,
  Moon
} from 'lucide-react';
import { Sidebar } from './shared/Sidebar';

const monthData = {
  month: 'December 2024',
  days: [
    // Week 1
    { date: 1, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 7.5 },
    { date: 2, status: 'slightly-over', meals: 4, workouts: 0, water: 6, sleep: 6.5 },
    { date: 3, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 8 },
    { date: 4, status: 'over-limit', meals: 5, workouts: 0, water: 5, sleep: 6 },
    { date: 5, status: 'goal-met', meals: 4, workouts: 1, water: 9, sleep: 7.5 },
    { date: 6, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 8 },
    { date: 7, status: 'slightly-over', meals: 4, workouts: 0, water: 7, sleep: 7 },
    // Week 2
    { date: 8, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 7.5 },
    { date: 9, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 8 },
    { date: 10, status: 'goal-met', meals: 4, workouts: 0, water: 7, sleep: 7 },
    { date: 11, status: 'slightly-over', meals: 5, workouts: 1, water: 6, sleep: 6.5 },
    { date: 12, status: 'goal-met', meals: 4, workouts: 1, water: 9, sleep: 8 },
    { date: 13, status: 'over-limit', meals: 5, workouts: 0, water: 5, sleep: 6 },
    { date: 14, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 7.5 },
    // Week 3
    { date: 15, status: 'goal-met', meals: 4, workouts: 0, water: 8, sleep: 7 },
    { date: 16, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 8 },
    { date: 17, status: 'slightly-over', meals: 4, workouts: 0, water: 6, sleep: 7 },
    { date: 18, status: 'goal-met', meals: 4, workouts: 1, water: 9, sleep: 7.5 },
    { date: 19, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 8 },
    { date: 20, status: 'goal-met', meals: 4, workouts: 0, water: 7, sleep: 7 },
    { date: 21, status: 'slightly-over', meals: 5, workouts: 1, water: 6, sleep: 6.5 },
    // Week 4
    { date: 22, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 7.5 },
    { date: 23, status: 'goal-met', meals: 4, workouts: 0, water: 7, sleep: 7 },
    { date: 24, status: 'over-limit', meals: 6, workouts: 0, water: 5, sleep: 6 },
    { date: 25, status: 'over-limit', meals: 6, workouts: 0, water: 6, sleep: 7 },
    { date: 26, status: 'slightly-over', meals: 5, workouts: 1, water: 7, sleep: 7.5 },
    { date: 27, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 8 },
    { date: 28, status: 'goal-met', meals: 4, workouts: 1, water: 9, sleep: 7.5 },
    // Week 5
    { date: 29, status: 'goal-met', meals: 4, workouts: 0, water: 8, sleep: 7 },
    { date: 30, status: 'goal-met', meals: 4, workouts: 1, water: 8, sleep: 8 },
    { date: 31, status: 'slightly-over', meals: 5, workouts: 0, water: 7, sleep: 7 },
  ],
};

const mealData = {
  breakfast: { name: 'Oatmeal with Berries', calories: 340, time: '8:00 AM' },
  lunch: { name: 'Grilled Chicken Salad', calories: 450, time: '12:30 PM' },
  snacks: { name: 'Greek Yogurt & Almonds', calories: 180, time: '3:00 PM' },
  dinner: { name: 'Baked Salmon & Veggies', calories: 520, time: '7:00 PM' },
};

export function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<number | null>(9);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'goal-met':
        return 'bg-[#85C872]';
      case 'slightly-over':
        return 'bg-[#F9D867]';
      case 'over-limit':
        return 'bg-[#FF6B6B]';
      default:
        return 'bg-gray-300';
    }
  };

  const selectedDayData = monthData.days.find(day => day.date === selectedDate);

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      <Sidebar activePage="Calendar" />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl mb-1">Calendar</h1>
                <p className="text-gray-600">Track your daily nutrition and fitness journey</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search dates..."
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
        <div className="p-8 flex gap-6">
          {/* Calendar Grid */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              {/* Month Header */}
              <div className="flex items-center justify-between mb-6">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl">{monthData.month}</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#85C872]"></div>
                  <span className="text-gray-600">Goal Met</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F9D867]"></div>
                  <span className="text-gray-600">Slightly Over</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div>
                  <span className="text-gray-600">Over Limit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#85C872]" />
                  <span className="text-gray-600">Workout Day</span>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-4 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-4">
                {monthData.days.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`aspect-square rounded-xl border-2 transition hover:border-[#85C872] relative ${
                      selectedDate === day.date
                        ? 'border-[#85C872] bg-[#85C872]/5'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-lg">{day.date}</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(day.status)}`}></div>
                      {day.workouts > 0 && (
                        <Dumbbell className="w-3 h-3 text-[#85C872]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          {selectedDate && selectedDayData && (
            <div className="w-96 bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl">December {selectedDate}, 2024</h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Meals Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <UtensilsCrossed className="w-5 h-5 text-[#85C872]" />
                  <h4 className="text-lg">Meals</h4>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="text-xs text-gray-500 mb-1">Breakfast • {mealData.breakfast.time}</div>
                    <h5 className="text-sm mb-1">{mealData.breakfast.name}</h5>
                    <div className="text-xs text-[#85C872]">{mealData.breakfast.calories} kcal</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="text-xs text-gray-500 mb-1">Lunch • {mealData.lunch.time}</div>
                    <h5 className="text-sm mb-1">{mealData.lunch.name}</h5>
                    <div className="text-xs text-[#85C872]">{mealData.lunch.calories} kcal</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="text-xs text-gray-500 mb-1">Snacks • {mealData.snacks.time}</div>
                    <h5 className="text-sm mb-1">{mealData.snacks.name}</h5>
                    <div className="text-xs text-[#85C872]">{mealData.snacks.calories} kcal</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="text-xs text-gray-500 mb-1">Dinner • {mealData.dinner.time}</div>
                    <h5 className="text-sm mb-1">{mealData.dinner.name}</h5>
                    <div className="text-xs text-[#85C872]">{mealData.dinner.calories} kcal</div>
                  </div>
                </div>
              </div>

              {/* Workouts Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Dumbbell className="w-5 h-5 text-[#85C872]" />
                  <h4 className="text-lg">Workouts</h4>
                </div>
                {selectedDayData.workouts > 0 ? (
                  <div className="p-3 bg-[#85C872]/10 rounded-xl border border-[#85C872]/30">
                    <h5 className="text-sm mb-1">Upper Body Strength</h5>
                    <div className="text-xs text-gray-600">45 minutes • 280 kcal burned</div>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center text-sm text-gray-500">
                    No workout logged
                  </div>
                )}
              </div>

              {/* Daily Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplet className="w-4 h-4 text-blue-500" />
                    <div className="text-xs text-gray-600">Water</div>
                  </div>
                  <div className="text-lg">{selectedDayData.water} glasses</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="w-4 h-4 text-purple-500" />
                    <div className="text-xs text-gray-600">Sleep</div>
                  </div>
                  <div className="text-lg">{selectedDayData.sleep} hours</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
