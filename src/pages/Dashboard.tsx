import React, { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useClasses } from "@/hooks/use-classes";

const taskCompletionData = [
  { subject: "Математика", completion: 75 },
  { subject: "Физика", completion: 60 },
  { subject: "Литература", completion: 90 },
  { subject: "История", completion: 40 }
];

const teacherQuickActionItems = [
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

const studentQuickActionItems = [
  { 
    title: "Просмотреть расписание",
    icon: CheckSquare,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    action: "view-schedule"
  },
  { 
    title: "Проверить задания",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
    action: "check-assignments"
  },
  { 
    title: "Посмотреть оценки",
    icon: BookOpen,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    action: "view-grades"
  },
  { 
    title: "Материалы курса",
    icon: Users,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    action: "course-materials"
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { classes, loading, createClass } = useClasses();
  const [tab, setTab] = useState("overview");
  const [createClassOpen, setCreateClassOpen] = useState(false);
  const [gradeStudentOpen, setGradeStudentOpen] = useState(false);
  
  const isTeacher = user?.role === "teacher" || user?.role === "admin";
  
  const quickActionItems = isTeacher ? teacherQuickActionItems : studentQuickActionItems;
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "create-class":
        if (isTeacher) {
          setCreateClassOpen(true);
        } else {
          toast.error("Только учителя могут создавать классы");
        }
        break;
      case "grade-student":
        if (isTeacher) {
          setGradeStudentOpen(true);
        } else {
          toast.error("Только учителя могут выставлять оценки");
        }
        break;
      case "add-student":
        toast.info("Функция добавления учеников будет доступна в ближайшем обновлении");
        break;
      case "create-assignment":
        toast.info("Функция создания заданий будет доступна в ближайшем обновлении");
        break;
      case "view-schedule":
        toast.info("Переход к расписанию занятий");
        break;
      case "check-assignments":
        toast.info("Переход к просмотру заданий");
        break;
      case "view-grades":
        toast.info("Переход к просмотру оценок");
        break;
      case "course-materials":
        toast.info("Переход к материалам курса");
        break;
      default:
        break;
    }
  };

  const handleClassCreated = (data: any) => {
    createClass({
      name: data.name,
      subject: data.subject,
      color: data.color
    });
    setTab("classes");
  };

  const displayedClasses = classes.slice(0, 4);

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-8 blue-white-gradient text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2 animate-slide-down">{getGreeting()}, {user?.name || 'Пользователь'}!</h1>
        <p className="text-white/80 animate-slide-down" style={{ animationDelay: '0.1s' }}>
          {isTeacher ? 'Вот ваш обзор на сегодня' : 'Добро пожаловать в вашу учебную панель'}
        </p>
      </div>
      
      <Card className="mb-8 blue-white-card">
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>
            {isTeacher 
              ? 'Воспользуйтесь этими функциями для оперативной работы' 
              : 'Быстрый доступ к основным функциям'
            }
          </CardDescription>
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
            {isTeacher && (
              <Button className="blue-white-button" onClick={() => setCreateClassOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Добавить класс
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-[200px] w-full" />
              ))}
            </div>
          ) : classes.length === 0 ? (
            <div className="text-center py-12 blue-card">
              <h3 className="text-xl font-medium mb-2">У вас пока нет классов</h3>
              <p className="text-muted-foreground mb-4">
                {isTeacher 
                  ? "Создайте свой первый класс, чтобы начать работу" 
                  : "Вы еще не записаны ни на один класс"}
              </p>
              {isTeacher && (
                <Button onClick={() => setCreateClassOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Создать первый класс
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedClasses.map((classItem, index) => (
                  <div key={classItem.id} className="staggered-item staggered-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ClassCard 
                      id={classItem.id}
                      name={classItem.name}
                      subject={classItem.subject}
                      teacher={classItem.teacher_name || "Преподаватель"}
                      studentCount={32}
                      color={classItem.color}
                    />
                  </div>
                ))}
              </div>
              
              {classes.length > 4 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline" asChild>
                    <Link to="/classes" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Перейти ко всем классам ({classes.length})
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
      
      {isTeacher && (
        <>
          <CreateClassForm 
            open={createClassOpen} 
            onOpenChange={setCreateClassOpen} 
            onClassCreated={handleClassCreated}
          />
          
          <GradeStudentForm 
            open={gradeStudentOpen} 
            onOpenChange={setGradeStudentOpen}
            className="Алгебра 9А"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
