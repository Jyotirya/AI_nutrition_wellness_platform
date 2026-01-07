import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Activity, 
  User,
  MoreVertical,
  X,
  Menu,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProfile } from '@/libapis/api';

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: UtensilsCrossed, label: 'Edit Meal', path: '/meal-plan' },
];

interface SidebarProps {
  activePage: string;
}

export function Sidebar({ activePage }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: profile } = await getProfile();
        const user = profile.user || {};
        const name = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User';
        const email = user.email || 'your@email.com';
        setUserInfo({ name, email });
      } catch (err) {
        console.warn('Could not load user profile for sidebar', err);
      }
    })();
  }, []);

  const displayName = userInfo.name || 'User';
  const displayEmail = userInfo.email || 'your@email.com';

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('onboarding_seed');
    navigate('/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed h-screen z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
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

        {/* Avatar Footer */}
        <div className="p-4 border-t border-gray-200 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#85C872] to-[#6AB854] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm">{displayName}</div>
              <div className="text-xs text-gray-500">{displayEmail}</div>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowLogoutMenu(!showLogoutMenu)}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          {/* Logout Menu Dropdown */}
          {showLogoutMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 flex items-center gap-2 text-red-600 hover:bg-red-50 transition text-sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}