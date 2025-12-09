import { Footprints, UtensilsCrossed, Dumbbell, Apple, Droplet, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    icon: UtensilsCrossed,
    title: 'Logged Breakfast',
    description: 'Oatmeal with berries - 340 kcal',
    time: '2 hours ago',
    color: '#F9D867',
  },
  {
    id: 2,
    icon: Dumbbell,
    title: 'Completed Workout',
    description: 'Upper body strength training - 45 min',
    time: '4 hours ago',
    color: '#85C872',
  },
  {
    id: 3,
    icon: Footprints,
    title: 'Morning Walk',
    description: '3,200 steps - 1.8 km',
    time: '5 hours ago',
    color: '#A5B4FC',
  },
  {
    id: 4,
    icon: Droplet,
    title: 'Hydration Goal',
    description: 'Drank 6 glasses of water',
    time: '6 hours ago',
    color: '#60A5FA',
  },
  {
    id: 5,
    icon: Apple,
    title: 'Healthy Snack',
    description: 'Mixed nuts and apple - 180 kcal',
    time: '7 hours ago',
    color: '#F9D867',
  },
];

export function RecentActivityPanel() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg">Recent Activity</h3>
        <button className="text-[#85C872] hover:text-[#6AB854] text-sm">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex gap-4">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${activity.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: activity.color }} />
                </div>
                {index < activities.length - 1 && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-4 bg-gray-200" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm">{activity.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
