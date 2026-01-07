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

      {/* Daily Menu Panel (Full Width) */}
      <DailyMenuPanel />
    </div>
  );
}