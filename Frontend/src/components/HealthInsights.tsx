import { 
  Search,
  Bell,
  User,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Target,
  Award,
  Lightbulb
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sidebar } from './shared/Sidebar';

const weightData = [
  { date: 'Nov 1', weight: 75.2 },
  { date: 'Nov 8', weight: 74.8 },
  { date: 'Nov 15', weight: 74.2 },
  { date: 'Nov 22', weight: 73.6 },
  { date: 'Nov 29', weight: 73.0 },
  { date: 'Dec 6', weight: 72.4 },
  { date: 'Dec 9', weight: 72.0 },
];

const calorieData = [
  { date: 'Dec 3', calories: 1850, target: 2000 },
  { date: 'Dec 4', calories: 2100, target: 2000 },
  { date: 'Dec 5', calories: 1920, target: 2000 },
  { date: 'Dec 6', calories: 1880, target: 2000 },
  { date: 'Dec 7', calories: 2050, target: 2000 },
  { date: 'Dec 8', calories: 1950, target: 2000 },
  { date: 'Dec 9', calories: 1900, target: 2000 },
];

const macroData = [
  { date: 'Dec 3', protein: 110, carbs: 220, fats: 60 },
  { date: 'Dec 4', protein: 125, carbs: 240, fats: 68 },
  { date: 'Dec 5', protein: 115, carbs: 210, fats: 62 },
  { date: 'Dec 6', protein: 108, carbs: 215, fats: 58 },
  { date: 'Dec 7', protein: 122, carbs: 235, fats: 65 },
  { date: 'Dec 8', protein: 118, carbs: 225, fats: 63 },
  { date: 'Dec 9', protein: 120, carbs: 218, fats: 61 },
];

const aiInsights = [
  {
    id: 1,
    type: 'achievement',
    icon: Award,
    color: '#85C872',
    title: 'Great Progress!',
    message: 'You\'ve lost 3.2 kg in the past month, exceeding your weekly goal by 15%. Keep up the excellent work!',
  },
  {
    id: 2,
    type: 'tip',
    icon: Lightbulb,
    color: '#F9D867',
    title: 'Protein Intake',
    message: 'Your protein intake is slightly below target. Consider adding lean meats, fish, or plant-based proteins to your meals.',
  },
  {
    id: 3,
    type: 'goal',
    icon: Target,
    color: '#A5B4FC',
    title: 'Weekly Goal Update',
    message: 'You\'re on track to meet your calorie goal this week. Maintain your current routine for optimal results.',
  },
  {
    id: 4,
    type: 'suggestion',
    icon: Sparkles,
    color: '#85C872',
    title: 'Workout Consistency',
    message: 'You\'ve worked out 4 times this week. Adding one more session could boost your metabolism and accelerate progress.',
  },
];

const comparisonData = [
  { metric: 'Avg Daily Calories', thisWeek: '1,925', lastWeek: '2,080', change: -7.5, positive: true },
  { metric: 'Workouts Completed', thisWeek: '4', lastWeek: '3', change: 33.3, positive: true },
  { metric: 'Avg Sleep Hours', thisWeek: '7.5', lastWeek: '6.8', change: 10.3, positive: true },
  { metric: 'Water Intake', thisWeek: '8.2', lastWeek: '7.5', change: 9.3, positive: true },
];

export function HealthInsights() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      <Sidebar activePage="Health Insights" />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 md:px-8 py-4 md:py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl mb-1">Health Insights</h1>
                <p className="text-sm md:text-base text-gray-600">AI-powered analytics and personalized recommendations</p>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search insights..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl w-64 focus:ring-2 focus:ring-[#85C872] focus:border-transparent outline-none"
                  />
                </div>
                <button className="relative p-2 hover:bg-gray-100 rounded-xl transition">
                  <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                </button>
                <button className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          {/* Comparison Cards */}
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl mb-4">This Week vs Last Week</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {comparisonData.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="text-sm text-gray-600 mb-3">{item.metric}</div>
                  <div className="flex items-end justify-between mb-2">
                    <div className="text-3xl text-[#85C872]">{item.thisWeek}</div>
                    <div className="text-sm text-gray-400 line-through">{item.lastWeek}</div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      item.positive ? 'text-[#85C872]' : 'text-[#FF6B6B]'
                    }`}
                  >
                    {item.positive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(item.change)}% {item.positive ? 'better' : 'worse'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Weight Progress Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg md:text-xl mb-4 md:mb-6">Weight Progress</h2>
              <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis domain={[70, 76]} stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '8px 12px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#85C872"
                      strokeWidth={3}
                      dot={{ fill: '#85C872', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Calorie Tracking Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
              <h2 className="text-lg md:text-xl mb-4 md:mb-6">Calorie Tracking</h2>
              <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={calorieData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '8px 12px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="calories"
                      stroke="#85C872"
                      strokeWidth={3}
                      dot={{ fill: '#85C872', r: 5 }}
                      name="Consumed"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#F9D867"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Target"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Macro Distribution Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 mb-6">
            <h2 className="text-lg md:text-xl mb-4 md:mb-6">Macro Distribution</h2>
            <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={macroData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '8px 12px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="protein"
                    stroke="#85C872"
                    strokeWidth={2}
                    dot={{ fill: '#85C872', r: 4 }}
                    name="Protein (g)"
                  />
                  <Line
                    type="monotone"
                    dataKey="carbs"
                    stroke="#F9D867"
                    strokeWidth={2}
                    dot={{ fill: '#F9D867', r: 4 }}
                    name="Carbs (g)"
                  />
                  <Line
                    type="monotone"
                    dataKey="fats"
                    stroke="#A5B4FC"
                    strokeWidth={2}
                    dot={{ fill: '#A5B4FC', r: 4 }}
                    name="Fats (g)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#85C872]" />
              <h2 className="text-xl md:text-2xl">AI Insights & Recommendations</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {aiInsights.map((insight) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={insight.id}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${insight.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: insight.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg mb-2">{insight.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{insight.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Section */}
          <div className="bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl mb-3">You&apos;re Doing Amazing! 🎉</h2>
                <p className="text-base md:text-lg opacity-90 mb-4">
                  You&apos;ve been consistently meeting your goals for 12 days straight. Your dedication is paying off with visible results.
                </p>
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div>
                    <div className="text-3xl">-3.2 kg</div>
                    <div className="text-sm opacity-75">Weight Lost</div>
                  </div>
                  <div>
                    <div className="text-3xl">28 days</div>
                    <div className="text-sm opacity-75">Active Streak</div>
                  </div>
                  <div>
                    <div className="text-3xl">94%</div>
                    <div className="text-sm opacity-75">Goal Achievement</div>
                  </div>
                </div>
              </div>
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-2xl flex items-center justify-center">
                <Award className="w-16 h-16 md:w-24 md:h-24" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}