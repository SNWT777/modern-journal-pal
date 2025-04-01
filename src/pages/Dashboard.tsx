
import React from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentGrades from "@/components/dashboard/RecentGrades";
import UpcomingAssignments from "@/components/dashboard/UpcomingAssignments";
import ClassCard from "@/components/classes/ClassCard";
import { Button } from "@/components/ui/button";

const classesData = [
  {
    id: 1,
    name: "Алгебра 9A",
    subject: "Математика",
    teacher: "Елена Петровна",
    studentCount: 28,
    color: "bg-edu-blue"
  },
  {
    id: 2,
    name: "Физика 9A",
    subject: "Физика",
    teacher: "Андрей Иванович",
    studentCount: 26,
    color: "bg-edu-green"
  },
  {
    id: 3,
    name: "Литература 9A",
    subject: "Гуманитарные науки",
    teacher: "Ольга Сергеевна",
    studentCount: 30,
    color: "bg-edu-accent"
  },
  {
    id: 4,
    name: "История 9A",
    subject: "Гуманитарные науки",
    teacher: "Дмитрий Александрович",
    studentCount: 27,
    color: "bg-edu-yellow"
  }
];

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Добро пожаловать, Учитель!</h1>
        <p className="text-muted-foreground">Вот ваш обзор на сегодня</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <RecentGrades />
        </div>
        <div>
          <UpcomingAssignments />
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Classes</h2>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classesData.map((classItem) => (
            <ClassCard key={classItem.id} {...classItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
