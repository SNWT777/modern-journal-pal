
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { CalendarDays, Users, BarChart2, TrendingUp } from "lucide-react";

const subjectPerformanceData = [
  { name: "Математика", average: 4.2 },
  { name: "Физика", average: 3.8 },
  { name: "Литература", average: 4.5 },
  { name: "История", average: 4.1 },
  { name: "Английский", average: 3.9 },
  { name: "Химия", average: 3.7 },
  { name: "Информатика", average: 4.6 }
];

const progressData = [
  { month: "Сент", average: 3.7 },
  { month: "Окт", average: 3.9 },
  { month: "Нояб", average: 4.1 },
  { month: "Дек", average: 3.8 },
  { month: "Янв", average: 4.0 },
  { month: "Фев", average: 4.2 },
  { month: "Март", average: 4.3 },
  { month: "Апр", average: 4.5 },
  { month: "Май", average: 4.4 }
];

const distributionData = [
  { grade: "5", count: 25 },
  { grade: "4", count: 38 },
  { grade: "3", count: 20 },
  { grade: "2", count: 7 },
  { grade: "Н", count: 5 }
];

const statCards = [
  {
    title: "Средний балл",
    value: "4.2",
    change: "+0.3",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Оценок за месяц",
    value: "42",
    change: "+12",
    icon: BarChart2,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Активных учеников",
    value: "143",
    change: "+5",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "Дни без пропусков",
    value: "18",
    change: "+2",
    icon: CalendarDays,
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  }
];

export const GradesStatistics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-2xl font-bold">{card.value}</p>
                    <span className="text-xs text-green-600">{card.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Динамика успеваемости</CardTitle>
            <CardDescription>Средний балл по месяцам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={progressData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis domain={[3, 5]} />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Средний балл']}
                  contentStyle={{ 
                    borderRadius: '6px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ fill: '#3b82f6', r: 4 }} 
                  activeDot={{ fill: '#1d4ed8', r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Распределение оценок</CardTitle>
            <CardDescription>Количество оценок по баллам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={distributionData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Количество']}
                  contentStyle={{ 
                    borderRadius: '6px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                  barSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Успеваемость по предметам</CardTitle>
          <CardDescription>Средний балл в разрезе предметов</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={subjectPerformanceData}
              margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip 
                formatter={(value) => [`${value}`, 'Средний балл']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
                }}
              />
              <Bar 
                dataKey="average" 
                fill="#3b82f6" 
                radius={[0, 4, 4, 0]} 
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
