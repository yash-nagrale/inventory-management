import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'blue' | 'yellow' | 'red' | 'purple' | 'green';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  red: 'bg-red-100 text-red-600',
  purple: 'bg-purple-100 text-purple-600',
  green: 'bg-green-100 text-green-600',
};

const trendColors = {
  up: 'text-red-600',
  down: 'text-green-600',
};

export function KPICard({ title, value, change, trend, icon: Icon, color }: KPICardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">{title}</span>
          <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl text-gray-900">{value}</div>
          <div className="flex items-center gap-1">
            <TrendIcon className={`w-4 h-4 ${trendColors[trend]}`} />
            <span className={`text-sm ${trendColors[trend]}`}>{change}</span>
            <span className="text-sm text-gray-500">from last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
