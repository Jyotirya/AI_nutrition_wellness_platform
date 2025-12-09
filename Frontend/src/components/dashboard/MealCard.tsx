import { RefreshCw, Plus, Info } from 'lucide-react';

interface Meal {
  id: number;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex-shrink-0 w-72">
      <div className="aspect-video overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2">{meal.name}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span>{meal.calories} kcal</span>
          <span>P: {meal.protein}g</span>
          <span>C: {meal.carbs}g</span>
          <span>F: {meal.fats}g</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 border border-gray-200 rounded-lg hover:border-[#85C872] transition text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Replace
          </button>
          <button className="flex-1 py-2 bg-[#85C872] text-white rounded-lg hover:bg-[#6AB854] transition text-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add
          </button>
          <button className="px-3 py-2 border border-gray-200 rounded-lg hover:border-[#85C872] transition">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
