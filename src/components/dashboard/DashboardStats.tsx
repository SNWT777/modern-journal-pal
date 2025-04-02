
import React, { useState } from "react";
import { BookOpen, GraduationCap, CalendarClock, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: { value: number; isPositive: boolean };
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

const StatCard = ({ title, value, change, icon, color, bgColor, onClick }: StatCardProps) => {
  return (
    <div 
      className={cn(
        "stat-card hover-scale cursor-pointer group",
        onClick && "hover:shadow-lg"
      )}
      onClick={onClick}
    >
      <div className={`${bgColor} p-3 rounded-lg group-hover:scale-110 transition-all duration-300`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-end">
          <h3 className="text-2xl font-semibold">{value}</h3>
          {change && (
            <div className={`flex items-center ml-2 text-xs ${change.isPositive ? 'text-edu-green' : 'text-edu-red'}`}>
              {change.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              <span>{Math.abs(change.value)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Активные классы"
          value={8}
          change={{ value: 5, isPositive: true }}
          icon={<BookOpen className="w-5 h-5 text-white" />}
          color="text-edu-blue"
          bgColor="bg-edu-blue"
          onClick={toggleDetails}
        />
        <StatCard
          title="Задания к сдаче"
          value={12}
          change={{ value: 2, isPositive: false }}
          icon={<CalendarClock className="w-5 h-5 text-white" />}
          color="text-edu-yellow"
          bgColor="bg-edu-yellow"
          onClick={toggleDetails}
        />
        <StatCard
          title="Всего учеников"
          value={186}
          change={{ value: 12, isPositive: true }}
          icon={<Users className="w-5 h-5 text-white" />}
          color="text-edu-green"
          bgColor="bg-edu-green"
          onClick={toggleDetails}
        />
        <StatCard
          title="Средняя оценка"
          value="4.5"
          change={{ value: 3, isPositive: true }}
          icon={<GraduationCap className="w-5 h-5 text-white" />}
          color="text-edu-accent"
          bgColor="bg-edu-accent"
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
                {[30, 45, 25, 60, 80, 45, 70].map((value, index) => (
                  <div 
                    key={index} 
                    className="bg-primary/80 hover:bg-primary rounded-sm transition-all hover:scale-y-110 cursor-pointer"
                    style={{ height: `${value}%`, width: '14%' }}
                    title={`День ${index + 1}: ${value}%`}
                  />
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
                  { value: 5, percent: 40, color: 'bg-edu-green' },
                  { value: 4, percent: 30, color: 'bg-edu-blue' },
                  { value: 3, percent: 20, color: 'bg-edu-yellow' },
                  { value: 2, percent: 10, color: 'bg-edu-red' }
                ].map((grade) => (
                  <div key={grade.value} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-full ${grade.color} hover:opacity-80 rounded-sm transition-all hover:scale-y-110 cursor-pointer`}
                      style={{ height: `${grade.percent * 2}px` }}
                      title={`${grade.value}: ${grade.percent}%`}
                    />
                    <span className="text-xs mt-1">{grade.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
