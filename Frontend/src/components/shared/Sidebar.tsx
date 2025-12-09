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
  User,
  MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: UtensilsCrossed, label: 'Meal Plan', path: '/meal-plan' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Book, label: 'Food Diary', path: '/food-diary' },
  { icon: Dumbbell, label: 'Exercises', path: '/exercises' },
  { icon: Activity, label: 'Health Insights', path: '/health-insights' },
  { icon: MessageCircle, label: 'AI Chat', path: '/ai-chat' },
  { icon: ShoppingCart, label: 'Grocery List', path: '/grocery-list' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  activePage: string;
}

export function Sidebar({ activePage }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-screen z-20">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl">Nutrigo</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activePage;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? 'bg-[#85C872] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* CTA Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-2xl p-4 text-white">
          <h3 className="mb-2">Start your journey</h3>
          <p className="text-sm opacity-90 mb-4">Get personalized nutrition and fitness plans</p>
          <button className="w-full py-2 bg-white text-[#85C872] rounded-lg text-sm hover:bg-gray-100 transition">
            Claim now
          </button>
        </div>
      </div>

      {/* Avatar Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm">Adam Smith</div>
            <div className="text-xs text-gray-500">adam@email.com</div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
