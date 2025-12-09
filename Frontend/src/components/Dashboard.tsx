import { 
  Search,
  Bell,
  User,
  TrendingDown,
  Footprints,
  Flame,
  Clock,
  Moon,
  ChevronRight
} from 'lucide-react';
import { Sidebar } from './shared/Sidebar';
import { WeightProgressRing } from './dashboard/WeightProgressRing';
import { CalorieIntakeRing } from './dashboard/CalorieIntakeRing';
import { MealCard } from './dashboard/MealCard';
import { ActivityCard } from './dashboard/ActivityCard';
import { RecentActivityPanel } from './dashboard/RecentActivityPanel';
import { DailyMenuPanel } from './dashboard/DailyMenuPanel';

const recommendedMeals = [
  {
    id: 1,
    name: 'Acai Bowl with Berries',
    image: 'https://images.unsplash.com/photo-1645517976245-569a91016f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYnJlYWtmYXN0JTIwYm93bHxlbnwxfHx8fDE3NjUyNjQzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 320,
    protein: 12,
    carbs: 45,
    fats: 14,
  },
  {
    id: 2,
    name: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHNhbGFkfGVufDF8fHx8MTc2NTI1ODE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 380,
    protein: 35,
    carbs: 22,
    fats: 18,
  },
  {
    id: 3,
    name: 'Fresh Fruit Mix',
    image: 'https://images.unsplash.com/photo-1586515468765-8052dda292d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0JTIwc25hY2t8ZW58MXx8fHwxNzY1Mjc1MDkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 180,
    protein: 3,
    carbs: 42,
    fats: 2,
  },
  {
    id: 4,
    name: 'Grilled Salmon & Veggies',
    image: 'https://images.unsplash.com/photo-1613293984606-b797e2c48842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBkaW5uZXIlMjBwbGF0ZXxlbnwxfHx8fDE3NjUyMDYxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    calories: 450,
    protein: 38,
    carbs: 28,
    fats: 22,
  },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      {/* Sidebar */}
      <Sidebar activePage="Dashboard" />

      {/* Main Content */}
      <main className="flex-1 ml-64 mr-80">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl mb-1">Hello, Adam!</h1>
                <p className="text-gray-600">Let&apos;s begin our journey to better health today</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search meals, exercises..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl w-64 focus:ring-2 focus:ring-[#85C872] focus:border-transparent outline-none"
                  />
                </div>
                <button className="relative p-2 hover:bg-gray-100 rounded-xl transition">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#F9D867] rounded-full"></span>
                </button>
                <button className="w-10 h-10 bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Weight Card */}
            <div className="col-span-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Weight Progress</h3>
                  <TrendingDown className="w-5 h-5 text-[#85C872]" />
                </div>
                <WeightProgressRing 
                  current={72}
                  goal={68}
                  weeklyChange={-0.8}
                />
              </div>
            </div>

            {/* Activity Cards */}
            <div className="col-span-8">
              <div className="grid grid-cols-2 gap-4">
                <ActivityCard
                  icon={Footprints}
                  label="Steps"
                  value="8,547"
                  target="10,000"
                  color="#85C872"
                  percentage={85}
                />
                <ActivityCard
                  icon={Flame}
                  label="Calories Burned"
                  value="542"
                  target="800"
                  color="#F9D867"
                  percentage={68}
                />
                <ActivityCard
                  icon={Clock}
                  label="Workout Minutes"
                  value="45"
                  target="60"
                  color="#85C872"
                  percentage={75}
                />
                <ActivityCard
                  icon={Moon}
                  label="Sleep Hours"
                  value="7.5"
                  target="8"
                  color="#A5B4FC"
                  percentage={94}
                />
              </div>
            </div>

            {/* Calorie Intake Ring */}
            <div className="col-span-5">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg mb-4">Daily Calorie Intake</h3>
                <CalorieIntakeRing 
                  consumed={1450}
                  target={2000}
                  protein={{ current: 85, target: 120 }}
                  carbs={{ current: 165, target: 220 }}
                  fats={{ current: 48, target: 65 }}
                />
              </div>
            </div>

            {/* Recent Activity Panel */}
            <div className="col-span-7">
              <RecentActivityPanel />
            </div>

            {/* Recommended Meals */}
            <div className="col-span-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Recommended Meals</h2>
                <button className="flex items-center gap-2 text-[#85C872] hover:text-[#6AB854] transition">
                  <span className="text-sm">View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
                {recommendedMeals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Daily Menu Panel (Right Sidebar) */}
      <DailyMenuPanel />
    </div>
  );
}