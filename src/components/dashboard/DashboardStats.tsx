
import React from "react";
import { BookOpen, GraduationCap, CalendarClock, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className={`${color} p-3 rounded-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Активные классы"
        value={8}
        icon={<BookOpen className="w-5 h-5 text-white" />}
        color="bg-edu-russian-blue"
      />
      <StatCard
        title="Задания к сдаче"
        value={12}
        icon={<CalendarClock className="w-5 h-5 text-white" />}
        color="bg-edu-yellow"
      />
      <StatCard
        title="Всего учеников"
        value={186}
        icon={<Users className="w-5 h-5 text-white" />}
        color="bg-edu-green"
      />
      <StatCard
        title="Средняя оценка"
        value="4.5"
        icon={<GraduationCap className="w-5 h-5 text-white" />}
        color="bg-edu-russian-red"
      />
    </div>
  );
};

export default DashboardStats;
