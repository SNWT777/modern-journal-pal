
import React, { useState } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentGrades from "@/components/dashboard/RecentGrades";
import UpcomingAssignments from "@/components/dashboard/UpcomingAssignments";
import ClassCard from "@/components/classes/ClassCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { BookOpen, CheckSquare, PlusCircle, ChevronRight, FileText, UserPlus, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CreateClassForm from "@/components/classes/CreateClassForm";
import GradeStudentForm from "@/components/grades/GradeStudentForm";
import { toast } from "sonner";
import { Link } from "react-router-dom";

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

const taskCompletionData = [
  { subject: "Математика", completion: 75 },
  { subject: "Физика", completion: 60 },
  { subject: "Литература", completion: 90 },
  { subject: "История", completion: 40 }
];

const quickActionItems = [
  { 
    title: "Создать новый класс",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    action: "create-class"
  },
  { 
    title: "Выставить оценку",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
    action: "grade-student"
  },
  { 
    title: "Добавить ученика",
    icon: UserPlus,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    action: "add-student"
  },
  { 
    title: "Создать задание",
    icon: CheckSquare,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    action: "create-assignment"
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");
  const [createClassOpen, setCreateClassOpen] = useState(false);
  const [gradeStudentOpen, setGradeStudentOpen] = useState(false);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "create-class":
        setCreateClassOpen(true);
        break;
      case "grade-student":
        setGradeStudentOpen(true);
        break;
      case "add-student":
        toast.info("Функция добавления учеников будет доступна в ближайшем обновлении");
        break;
      case "create-assignment":
        toast.info("Функция создания заданий будет доступна в ближайшем обновлении");
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-8 blue-white-gradient text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2 animate-slide-down">{getGreeting()}, {user?.name || 'Учитель'}!</h1>
        <p className="text-white/80 animate-slide-down" style={{ animationDelay: '0.1s' }}>Вот ваш обзор на сегодня</p>
      </div>
      
      {/* Quick Actions Card */}
      <Card className="mb-8 blue-white-card">
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>Воспользуйтесь этими функциями для оперативной работы</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActionItems.map((item, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-3 border-2 hover:border-primary transition-all staggered-item staggered-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleQuickAction(item.action)}
              >
                <div className={`${item.bgColor} p-3 rounded-full ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <span>{item.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" value={tab} onValueChange={setTab} className="mb-8">
        <TabsList className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-1">
          <TabsTrigger value="overview" className="text-base data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800">Обзор</TabsTrigger>
          <TabsTrigger value="tasks" className="text-base data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800">Задания</TabsTrigger>
          <TabsTrigger value="classes" className="text-base data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800">Классы</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-fade-in">
          <DashboardStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <RecentGrades />
            </div>
            <div>
              <UpcomingAssignments />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="blue-card">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <CheckSquare className="mr-2 h-5 w-5 text-primary" />
                Прогресс заданий
              </h3>
              <div className="space-y-4">
                {taskCompletionData.map((task, index) => (
                  <div key={index} className="staggered-item staggered-fade-in">
                    <div className="flex justify-between mb-1">
                      <span>{task.subject}</span>
                      <span className="text-muted-foreground">{task.completion}%</span>
                    </div>
                    <Progress value={task.completion} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="blue-card">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Ближайшие дедлайны
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-md bg-white dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-800/30 transition-colors staggered-item staggered-fade-in">
                    <div>
                      <h4 className="font-medium">Тест по главе {index + 3}</h4>
                      <p className="text-sm text-muted-foreground">Математика</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{index === 0 ? 'Завтра' : `${index + 2} дня`}</p>
                      <p className="text-xs text-muted-foreground">12:00</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full justify-between mt-2">
                  <span>Показать все</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="classes" className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gradient">Ваши классы</h2>
            <Button className="blue-white-button" onClick={() => setCreateClassOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить класс
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classesData.map((classItem, index) => (
              <div key={classItem.id} className="staggered-item staggered-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ClassCard {...classItem} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/classes" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Перейти ко всем классам
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <CreateClassForm 
        open={createClassOpen} 
        onOpenChange={setCreateClassOpen} 
        onClassCreated={() => {
          toast.success("Класс успешно создан!");
          setTab("classes");
        }}
      />
      
      <GradeStudentForm 
        open={gradeStudentOpen} 
        onOpenChange={setGradeStudentOpen}
        className="Алгебра 9А"
      />
    </div>
  );
};

export default Dashboard;
