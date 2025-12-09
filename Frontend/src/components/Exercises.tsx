import { 
  Search,
  Bell,
  User,
  Plus,
  Flame,
  Clock,
  TrendingUp,
  Watch,
  Smartphone,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sidebar } from './shared/Sidebar';

const weeklyData = [
  { day: 'Mon', calories: 320 },
  { day: 'Tue', calories: 450 },
  { day: 'Wed', calories: 280 },
  { day: 'Thu', calories: 0 },
  { day: 'Fri', calories: 380 },
  { day: 'Sat', calories: 420 },
  { day: 'Sun', calories: 350 },
];

const workoutList = [
  { id: 1, name: 'Morning Run', category: 'Cardio', duration: 30, calories: 320, intensity: 'High', date: 'Dec 9, 2024' },
  { id: 2, name: 'Upper Body Strength', category: 'Strength', duration: 45, calories: 280, intensity: 'Medium', date: 'Dec 8, 2024' },
  { id: 3, name: 'Yoga Flow', category: 'Flexibility', duration: 60, calories: 180, intensity: 'Low', date: 'Dec 7, 2024' },
  { id: 4, name: 'HIIT Training', category: 'Cardio', duration: 25, calories: 350, intensity: 'High', date: 'Dec 6, 2024' },
  { id: 5, name: 'Lower Body Strength', category: 'Strength', duration: 50, calories: 310, intensity: 'High', date: 'Dec 5, 2024' },
  { id: 6, name: 'Cycling', category: 'Cardio', duration: 40, calories: 380, intensity: 'Medium', date: 'Dec 4, 2024' },
  { id: 7, name: 'Core Workout', category: 'Strength', duration: 20, calories: 150, intensity: 'Medium', date: 'Dec 3, 2024' },
  { id: 8, name: 'Swimming', category: 'Cardio', duration: 45, calories: 420, intensity: 'High', date: 'Dec 2, 2024' },
];

const activitySummary = [
  { label: 'Total Workouts', value: '24', change: '+3 this week', color: '#85C872' },
  { label: 'Calories Burned', value: '5,420', change: '+850 kcal', color: '#F9D867' },
  { label: 'Active Minutes', value: '680', change: '+120 min', color: '#A5B4FC' },
  { label: 'Avg Heart Rate', value: '142 bpm', change: '-5 bpm', color: '#FF6B6B' },
];

export function Exercises() {
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'High':
        return 'bg-[#FF6B6B] text-white';
      case 'Medium':
        return 'bg-[#F9D867] text-gray-800';
      case 'Low':
        return 'bg-[#A5B4FC] text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Cardio':
        return 'bg-[#85C872]';
      case 'Strength':
        return 'bg-[#F9D867]';
      case 'Flexibility':
        return 'bg-[#A5B4FC]';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      <Sidebar activePage="Exercises" />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl mb-1">Exercises</h1>
                <p className="text-gray-600">Track your workouts and fitness progress</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search workouts..."
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
          {/* Activity Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {activitySummary.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">{item.label}</div>
                <div className="text-3xl mb-2" style={{ color: item.color }}>
                  {item.value}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <TrendingUp className="w-3 h-3" />
                  {item.change}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Weekly Bar Chart */}
            <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl mb-6">Weekly Activity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '8px 12px',
                    }}
                  />
                  <Bar dataKey="calories" fill="#85C872" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Fitness Device Integration */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl mb-6">Connected Devices</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-[#85C872]/10 to-white rounded-xl border border-[#85C872]/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#85C872] rounded-lg flex items-center justify-center">
                        <Watch className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm">Apple Watch</div>
                        <div className="text-xs text-gray-500">Connected</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Activity className="w-3 h-3" />
                    <span>Synced 5 min ago</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm">iPhone Health</div>
                        <div className="text-xs text-gray-500">Connected</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Activity className="w-3 h-3" />
                    <span>Synced 12 min ago</span>
                  </div>
                </div>

                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-[#85C872] hover:text-[#85C872] transition">
                  + Connect New Device
                </button>
              </div>
            </div>
          </div>

          {/* Workout List */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl">Recent Workouts</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#85C872] text-white rounded-xl hover:bg-[#6AB854] transition">
                <Plus className="w-4 h-4" />
                Add Workout
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Workout Name</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Category</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Duration</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Calories</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Intensity</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {workoutList.map((workout, index) => (
                    <tr
                      key={workout.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm">{workout.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs text-white ${getCategoryColor(
                            workout.category
                          )}`}
                        >
                          {workout.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {workout.duration} min
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-[#F9D867]">
                          <Flame className="w-4 h-4" />
                          {workout.calories} kcal
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getIntensityColor(workout.intensity)}`}>
                          {workout.intensity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs text-gray-500">{workout.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 bg-gradient-to-r from-[#85C872]/5 to-[#6AB854]/5 px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Workouts: {workoutList.length}</span>
                <div className="flex items-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Total Duration: </span>
                    <span className="text-[#85C872]">
                      {workoutList.reduce((sum, w) => sum + w.duration, 0)} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#F9D867]" />
                    <span className="text-gray-600">Total Calories: </span>
                    <span className="text-[#F9D867]">
                      {workoutList.reduce((sum, w) => sum + w.calories, 0)} kcal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
