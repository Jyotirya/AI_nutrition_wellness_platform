import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface WeightProgressRingProps {
  current: number;
  goal: number;
  weeklyChange: number;
}

export function WeightProgressRing({ current, goal, weeklyChange }: WeightProgressRingProps) {
  const progress = Math.min(100, ((current - goal) / current) * 100);
  const remaining = 100 - progress;

  const data = [
    { name: 'Progress', value: progress },
    { name: 'Remaining', value: remaining },
  ];

  const COLORS = ['#85C872', '#E5E7EB'];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
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
            <div className="text-3xl text-[#85C872] mb-1">{current} kg</div>
            <div className="text-xs text-gray-500">Current</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-6">
        <div className="text-center p-3 bg-gray-50 rounded-xl">
          <div className="text-xs text-gray-500 mb-1">Goal Weight</div>
          <div className="text-lg">{goal} kg</div>
        </div>
        <div className="text-center p-3 bg-[#85C872]/10 rounded-xl">
          <div className="text-xs text-gray-500 mb-1">This Week</div>
          <div className="text-lg text-[#85C872]">
            {weeklyChange > 0 ? '+' : ''}{weeklyChange} kg
          </div>
        </div>
      </div>
    </div>
  );
}
