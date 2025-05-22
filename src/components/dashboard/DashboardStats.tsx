
import React, { useState } from "react";
import { BookOpen, GraduationCap, CalendarClock, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

/**
 * Props for the StatCard component.
 */
interface StatCardProps {
  /** The title of the statistic card. */
  title: string;
  /** The main value to be displayed on the card. */
  value: string | number;
  /** Optional object to display a change percentage.
   *  `value`: The percentage change (absolute value).
   *  `isPositive`: Boolean indicating if the change is positive or negative.
   */
  change?: { value: number; isPositive: boolean };
  /** React node for the icon to be displayed on the card. */
  icon: React.ReactNode;
  /** Tailwind CSS class for the icon's text color. */
  color: string;
  /** Tailwind CSS class for the icon's background color. */
  bgColor: string;
  /** Optional click handler function for the card. */
  onClick?: () => void;
}

/**
 * StatCard is a reusable component to display a single statistic with an icon, title, value, and optional change indicator.
 */
const StatCard = ({ title, value, change, icon, color, bgColor, onClick }: StatCardProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault(); // Prevent default space bar scroll
      onClick();
    }
  };

  const statCardLabel = `${title}: ${value}${change ? `, ${change.isPositive ? 'Increase of' : 'Decrease of'} ${Math.abs(change.value)}%` : ''}`;

  return (
    <div
      className={cn(
        "stat-card hover-scale cursor-pointer group",
        onClick && "hover:shadow-lg"
      )}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={statCardLabel}
    >
      <div className={`${bgColor} p-3 rounded-lg group-hover:scale-110 transition-all duration-300`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-end">
          <h3 className="text-2xl font-semibold">{value}</h3>
          {change && (
            <div className={`flex items-center ml-2 text-xs ${change.isPositive ? 'text-success' : 'text-destructive'}`}>
              {change.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              <span aria-label={`${change.isPositive ? 'Increase of ' : 'Decrease of '}${Math.abs(change.value)}%`}>
                {Math.abs(change.value)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  /**
   * Toggles the visibility of the detailed statistics section.
   */
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
          title="Активные классы"
          value={8}
          change={{ value: 5, isPositive: true }}
          icon={<BookOpen className="w-5 h-5 text-primary-foreground" />}
          color="text-primary-foreground"
          bgColor="bg-primary"
          onClick={toggleDetails}
        />
        <StatCard
          title="Задания к сдаче"
          value={12}
          change={{ value: 2, isPositive: false }}
          icon={<CalendarClock className="w-5 h-5 text-warning-foreground" />}
          color="text-warning-foreground"
          bgColor="bg-warning"
          onClick={toggleDetails}
        />
        <StatCard
          title="Всего учеников"
          value={186}
          change={{ value: 12, isPositive: true }}
          icon={<Users className="w-5 h-5 text-success-foreground" />}
          color="text-success-foreground"
          bgColor="bg-success"
          onClick={toggleDetails}
        />
        <StatCard
          title="Средняя оценка"
          value="4.5"
          change={{ value: 3, isPositive: true }}
          icon={<GraduationCap className="w-5 h-5 text-accent-foreground" />}
          color="text-accent-foreground"
          bgColor="bg-accent"
          onClick={toggleDetails}
        />
      </div>
      
      {showDetails && (
        <div className="bg-card border rounded-lg p-4 shadow-sm animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Детализация статистики</h3>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-secondary/50 rounded-md">
              <h4 className="text-sm font-medium mb-2">Активность за неделю</h4>
              <div className="flex space-x-1 h-12">
                {[30, 45, 25, 60, 80, 45, 70].map((activity, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div 
                        className="bg-primary hover:opacity-90 rounded-sm transition-all hover:scale-y-110 cursor-pointer"
                        style={{ height: `${activity}%`, width: '14%' }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>День {index + 1}: {activity}%</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Пн</span>
                <span>Вс</span>
              </div>
            </div>
            
            <div className="p-3 bg-secondary/50 rounded-md">
              <h4 className="text-sm font-medium mb-2">Распределение оценок</h4>
              <div className="flex items-end space-x-3 h-12 mt-2">
                {[
                  { value: 5, percent: 40, color: 'bg-success' },
                  { value: 4, percent: 30, color: 'bg-info' },
                  { value: 3, percent: 20, color: 'bg-warning' },
                  { value: 2, percent: 10, color: 'bg-destructive' }
                ].map((grade) => (
                  <Tooltip key={grade.value}>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col items-center flex-1 cursor-pointer">
                        <div 
                          className={`w-full ${grade.color} hover:opacity-80 rounded-sm transition-all hover:scale-y-110`}
                          style={{ height: `${grade.percent * 2}px` }}
                        />
                        <span className="text-xs mt-1">{grade.value}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Оценка {grade.value}: {grade.percent}%</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </TooltipProvider>
  );
};

/**
 * DashboardStats component displays a set of summary statistics cards and a detailed section
 * with charts for weekly activity and grade distribution. The detailed section can be toggled.
 */
export default DashboardStats;
