import { useState } from 'react';
import { 
  Search,
  Bell,
  User,
  Plus,
  Filter,
  Download
} from 'lucide-react';
import { Sidebar } from './shared/Sidebar';

const foodDatabase = [
  { id: 1, name: 'Grilled Chicken Breast', category: 'Protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, time: '12:30 PM' },
  { id: 2, name: 'Brown Rice', category: 'Grains', calories: 216, protein: 5, carbs: 45, fat: 1.8, time: '12:30 PM' },
  { id: 3, name: 'Broccoli', category: 'Vegetables', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, time: '12:30 PM' },
  { id: 4, name: 'Greek Yogurt', category: 'Dairy', calories: 130, protein: 11, carbs: 9, fat: 5, time: '3:00 PM' },
  { id: 5, name: 'Almonds (28g)', category: 'Nuts', calories: 164, protein: 6, carbs: 6, fat: 14, time: '3:00 PM' },
  { id: 6, name: 'Salmon Fillet', category: 'Protein', calories: 280, protein: 39, carbs: 0, fat: 13, time: '7:00 PM' },
  { id: 7, name: 'Sweet Potato', category: 'Vegetables', calories: 112, protein: 2, carbs: 26, fat: 0.1, time: '7:00 PM' },
  { id: 8, name: 'Avocado', category: 'Fats', calories: 240, protein: 3, carbs: 13, fat: 22, time: '8:00 AM' },
  { id: 9, name: 'Oatmeal (1 cup)', category: 'Grains', calories: 166, protein: 6, carbs: 28, fat: 3.6, time: '8:00 AM' },
  { id: 10, name: 'Blueberries (1 cup)', category: 'Fruits', calories: 84, protein: 1.1, carbs: 21, fat: 0.5, time: '8:00 AM' },
  { id: 11, name: 'Whole Wheat Bread', category: 'Grains', calories: 140, protein: 6, carbs: 24, fat: 2, time: '8:00 AM' },
  { id: 12, name: 'Eggs (2 large)', category: 'Protein', calories: 143, protein: 13, carbs: 1, fat: 10, time: '8:00 AM' },
  { id: 13, name: 'Quinoa (1 cup)', category: 'Grains', calories: 222, protein: 8, carbs: 39, fat: 3.6, time: '12:30 PM' },
  { id: 14, name: 'Spinach (1 cup)', category: 'Vegetables', calories: 7, protein: 0.9, carbs: 1, fat: 0.1, time: '12:30 PM' },
  { id: 15, name: 'Apple', category: 'Fruits', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, time: '3:00 PM' },
  { id: 16, name: 'Peanut Butter (2 tbsp)', category: 'Fats', calories: 188, protein: 8, carbs: 7, fat: 16, time: '3:00 PM' },
  { id: 17, name: 'Tuna (canned)', category: 'Protein', calories: 179, protein: 39, carbs: 0, fat: 1.3, time: '12:30 PM' },
  { id: 18, name: 'Cottage Cheese', category: 'Dairy', calories: 163, protein: 28, carbs: 6, fat: 2.3, time: '3:00 PM' },
];

export function FoodDiary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Protein', 'Grains', 'Vegetables', 'Fruits', 'Dairy', 'Nuts', 'Fats'];

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Protein: 'bg-[#85C872]',
      Grains: 'bg-[#F9D867]',
      Vegetables: 'bg-[#6AB854]',
      Fruits: 'bg-[#FF6B6B]',
      Dairy: 'bg-[#A5B4FC]',
      Nuts: 'bg-[#D4A574]',
      Fats: 'bg-[#FFA07A]',
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex">
      <Sidebar activePage="Food Diary" />

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl mb-1">Food Diary</h1>
                <p className="text-gray-600">Browse and track your daily food intake</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search foods..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
          {/* Filters and Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <div className="flex items-center gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm transition ${
                        selectedCategory === category
                          ? 'bg-[#85C872] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:border-[#85C872] transition">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#85C872] text-white rounded-xl hover:bg-[#6AB854] transition">
                  <Plus className="w-4 h-4" />
                  Add Custom Food
                </button>
              </div>
            </div>
          </div>

          {/* Food Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Food Name</th>
                    <th className="px-6 py-4 text-left text-sm text-gray-600">Category</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Calories</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Protein (g)</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Carbs (g)</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Fat (g)</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Time</th>
                    <th className="px-6 py-4 text-center text-sm text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFoods.map((food, index) => (
                    <tr
                      key={food.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm">{food.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs text-white ${getCategoryColor(
                            food.category
                          )}`}
                        >
                          {food.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm">{food.calories}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-[#85C872]">{food.protein}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-[#F9D867]">{food.carbs}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm text-[#A5B4FC]">{food.fat}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs text-gray-500">{food.time}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="px-3 py-1 bg-[#85C872] text-white rounded-lg text-sm hover:bg-[#6AB854] transition">
                          Add to Plan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 bg-gradient-to-r from-[#85C872]/5 to-[#6AB854]/5 px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Items: {filteredFoods.length}</span>
                <div className="flex items-center gap-8 text-sm">
                  <div>
                    <span className="text-gray-600">Total Calories: </span>
                    <span className="text-[#85C872]">
                      {filteredFoods.reduce((sum, food) => sum + food.calories, 0)} kcal
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Protein: </span>
                    <span className="text-[#85C872]">
                      {filteredFoods.reduce((sum, food) => sum + food.protein, 0)}g
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Carbs: </span>
                    <span className="text-[#F9D867]">
                      {filteredFoods.reduce((sum, food) => sum + food.carbs, 0)}g
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Fat: </span>
                    <span className="text-[#A5B4FC]">
                      {filteredFoods.reduce((sum, food) => sum + food.fat, 0).toFixed(1)}g
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
