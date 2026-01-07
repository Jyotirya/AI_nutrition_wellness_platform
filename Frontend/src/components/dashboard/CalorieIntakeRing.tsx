import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CalorieIntakeRingProps {
  consumed: number;
  target: number;
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
  fats: { current: number; target: number };
}

export function CalorieIntakeRing({ consumed, target, protein, carbs, fats }: CalorieIntakeRingProps) {
  const percentage = Math.min(100, (consumed / target) * 100);
  const remaining = 100 - percentage;

  const data = [
    { name: 'Consumed', value: percentage },
    { name: 'Remaining', value: remaining },
  ];

  const COLORS = ['#85C872', '#E5E7EB'];

  const macros = [
    {
      name: 'Protein',
      current: protein.current,
      target: protein.target,
      color: '#85C872',
      percentage: (protein.current / protein.target) * 100,
    },
    {
      name: 'Carbs',
      current: carbs.current,
      target: carbs.target,
      color: '#F9D867',
      percentage: (carbs.current / carbs.target) * 100,
    },
    {
      name: 'Fats',
      current: fats.current,
      target: fats.target,
      color: '#A5B4FC',
      percentage: (fats.current / fats.target) * 100,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width={192} height={192}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl text-[#85C872] mb-1">{consumed}</div>
              <div className="text-xs text-gray-500">of {target} kcal</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {macros.map((macro) => (
          <div key={macro.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{macro.name}</span>
              <span className="text-sm">
                {macro.current}g / {macro.target}g
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, macro.percentage)}%`,
                  backgroundColor: macro.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}