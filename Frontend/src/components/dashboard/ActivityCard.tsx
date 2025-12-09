import { LucideIcon } from 'lucide-react';

interface ActivityCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  target: string;
  color: string;
  percentage: number;
}

export function ActivityCard({ icon: Icon, label, value, target, color, percentage }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className="text-right">
          <div className="text-2xl mb-1">{value}</div>
          <div className="text-xs text-gray-500">of {target}</div>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-sm text-gray-600">{label}</div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(100, percentage)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
