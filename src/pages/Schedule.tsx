
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, BookOpen, User, List, Filter, Calendar, Download, PlusCircle } from "lucide-react";
import { format, addDays, subDays, getDay, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

// Mock schedule data
const weekScheduleData = [
  {
    day: "Monday",
    date: "2023-05-15",
    lessons: [
      { id: 1, time: "8:30 - 9:15", subject: "Математика", teacher: "Петрова Е.А.", room: "Кабинет 215", color: "blue" },
      { id: 2, time: "9:25 - 10:10", subject: "История", teacher: "Иванов Д.С.", room: "Кабинет 310", color: "amber" },
      { id: 3, time: "10:20 - 11:05", subject: "Физика", teacher: "Смирнов А.В.", room: "Кабинет 118", color: "green" },
      { id: 4, time: "11:25 - 12:10", subject: "Литература", teacher: "Козлова М.И.", room: "Кабинет 207", color: "purple" }
    ]
  },
  {
    day: "Tuesday",
    date: "2023-05-16",
    lessons: [
      { id: 5, time: "8:30 - 9:15", subject: "Английский язык", teacher: "Соколова Т.П.", room: "Кабинет 301", color: "red" },
      { id: 6, time: "9:25 - 10:10", subject: "Математика", teacher: "Петрова Е.А.", room: "Кабинет 215", color: "blue" },
      { id: 7, time: "10:20 - 11:05", subject: "География", teacher: "Васильев К.Н.", room: "Кабинет 220", color: "green" },
      { id: 8, time: "11:25 - 12:10", subject: "Физкультура", teacher: "Морозов А.И.", room: "Спортзал", color: "orange" }
    ]
  },
  {
    day: "Wednesday",
    date: "2023-05-17",
    lessons: [
      { id: 9, time: "8:30 - 9:15", subject: "Биология", teacher: "Николаева О.В.", room: "Кабинет 219", color: "green" },
      { id: 10, time: "9:25 - 10:10", subject: "Химия", teacher: "Федорова А.М.", room: "Кабинет 318", color: "purple" },
      { id: 11, time: "10:20 - 11:05", subject: "Математика", teacher: "Петрова Е.А.", room: "Кабинет 215", color: "blue" },
      { id: 12, time: "11:25 - 12:10", subject: "Информатика", teacher: "Сергеев П.А.", room: "Кабинет 404", color: "teal" }
    ]
  },
  {
    day: "Thursday",
    date: "2023-05-18",
    lessons: [
      { id: 13, time: "8:30 - 9:15", subject: "Литература", teacher: "Козлова М.И.", room: "Кабинет 207", color: "purple" },
      { id: 14, time: "9:25 - 10:10", subject: "Русский язык", teacher: "Козлова М.И.", room: "Кабинет 207", color: "purple" },
      { id: 15, time: "10:20 - 11:05", subject: "История", teacher: "Иванов Д.С.", room: "Кабинет 310", color: "amber" },
      { id: 16, time: "11:25 - 12:10", subject: "Английский язык", teacher: "Соколова Т.П.", room: "Кабинет 301", color: "red" }
    ]
  },
  {
    day: "Friday",
    date: "2023-05-19",
    lessons: [
      { id: 17, time: "8:30 - 9:15", subject: "Физика", teacher: "Смирнов А.В.", room: "Кабинет 118", color: "green" },
      { id: 18, time: "9:25 - 10:10", subject: "Алгебра", teacher: "Петрова Е.А.", room: "Кабинет 215", color: "blue" },
      { id: 19, time: "10:20 - 11:05", subject: "Геометрия", teacher: "Петрова Е.А.", room: "Кабинет 215", color: "blue" },
      { id: 20, time: "11:25 - 12:10", subject: "Физкультура", teacher: "Морозов А.И.", room: "Спортзал", color: "orange" }
    ]
  }
];

// Color map for the subjects
const colorMap: Record<string, { bg: string, text: string, border: string, light: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200", light: "bg-blue-50" },
  green: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", light: "bg-green-50" },
  purple: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200", light: "bg-purple-50" },
  amber: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200", light: "bg-amber-50" },
  red: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", light: "bg-red-50" },
  orange: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200", light: "bg-orange-50" },
  teal: { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-200", light: "bg-teal-50" }
};

// Empty days for a calendar view
const emptyDays = [0, 1, 2, 3, 4, 5, 6].map(day => ({
  dayNumber: day,
  isCurrentMonth: true,
  lessons: []
}));

const Schedule = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"week" | "day" | "month">("week");
  const [selectedDay, setSelectedDay] = useState<number>(getDay(new Date()));
  const isTeacher = user?.role === "teacher" || user?.role === "admin";
  
  // Calculate the current week's start and end dates
  const formattedDate = format(date, 'PPP', { locale: ru });
  
  // Handle next and previous week navigation
  const handlePrevPeriod = () => {
    if (view === "week") {
      setDate(subDays(date, 7));
    } else if (view === "day") {
      setDate(subDays(date, 1));
    } else {
      // Handle month view
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      setDate(newDate);
    }
  };
  
  const handleNextPeriod = () => {
    if (view === "week") {
      setDate(addDays(date, 7));
    } else if (view === "day") {
      setDate(addDays(date, 1));
    } else {
      // Handle month view
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      setDate(newDate);
    }
  };
  
  // Get the day schedule for the selected day
  const getDaySchedule = (dayIndex: number) => {
    return weekScheduleData[dayIndex]?.lessons || [];
  };
  
  const currentDaySchedule = getDaySchedule(selectedDay);
  
  // Handle create schedule action (for teachers)
  const handleCreateSchedule = () => {
    if (isTeacher) {
      toast.info("Функция создания расписания будет доступна в ближайшем обновлении");
    } else {
      toast.error("Только учителя могут создавать расписание");
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      {/* Header Section */}
      <div className="relative mb-8 p-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Расписание занятий</h1>
          <p className="opacity-90">Полное расписание ваших уроков и мероприятий</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white py-1">
              9 "А" класс
            </Badge>
            <Badge variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white py-1">
              2023-2024 учебный год
            </Badge>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="10" y="10" width="80" height="80" rx="5" stroke="white" strokeWidth="2"/>
            <line x1="10" y1="30" x2="90" y2="30" stroke="white" strokeWidth="2"/>
            <line x1="30" y1="10" x2="30" y2="90" stroke="white" strokeWidth="2"/>
            <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="2"/>
            <line x1="70" y1="10" x2="70" y2="90" stroke="white" strokeWidth="2"/>
            <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="2"/>
            <line x1="10" y1="70" x2="90" y2="70" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      {/* Schedule Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formattedDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="icon" onClick={handleNextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" onClick={() => setDate(new Date())}>
            Сегодня
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Tabs defaultValue="week" value={view} onValueChange={(v) => setView(v as "week" | "day" | "month")}>
            <TabsList className="bg-blue-50 dark:bg-blue-900/20">
              <TabsTrigger value="day">День</TabsTrigger>
              <TabsTrigger value="week">Неделя</TabsTrigger>
              <TabsTrigger value="month">Месяц</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Фильтры
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                По предметам
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                По учителям
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MapPin className="mr-2 h-4 w-4" />
                По кабинетам
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isTeacher && (
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleCreateSchedule}>
              <PlusCircle className="h-4 w-4" />
              Создать расписание
            </Button>
          )}
        </div>
      </div>
      
      {/* Schedule Content */}
      <div className="grid grid-cols-1 gap-6">
        <TabsContent value="week" className="m-0">
          <Card className="shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {weekScheduleData.map((day, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-lg border border-gray-200 hover:border-blue-300 transition-all ${selectedDay === index ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
                  onClick={() => {
                    setSelectedDay(index);
                    setView("day");
                  }}
                >
                  <div className={`p-3 rounded-t-lg font-medium flex justify-between items-center ${selectedDay === index ? 'bg-blue-50' : 'bg-gray-50'}`}>
                    <span>{['Пн', 'Вт', 'Ср', 'Чт', 'Пт'][index]}</span>
                    <Badge variant="outline" className={`${selectedDay === index ? 'border-blue-400 text-blue-700' : ''}`}>
                      {day.lessons.length}
                    </Badge>
                  </div>
                  <div className="p-3 space-y-2 max-h-[200px] overflow-auto">
                    {day.lessons.map(lesson => (
                      <div 
                        key={lesson.id} 
                        className={`text-xs p-2 rounded-md ${colorMap[lesson.color].bg} ${colorMap[lesson.color].text} border ${colorMap[lesson.color].border}`}
                      >
                        <div className="font-medium">{lesson.subject}</div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {lesson.time}
                        </div>
                      </div>
                    ))}
                    {day.lessons.length === 0 && (
                      <div className="text-center text-sm text-muted-foreground py-6">
                        Нет уроков
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="day" className="m-0">
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'][selectedDay]}
                  </CardTitle>
                  <CardDescription>
                    {weekScheduleData[selectedDay]?.date}
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setView("week")}>
                  <List className="mr-2 h-4 w-4" />
                  Вся неделя
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentDaySchedule.length > 0 ? (
                  currentDaySchedule.map(lesson => (
                    <div 
                      key={lesson.id} 
                      className={`flex p-4 rounded-lg border ${colorMap[lesson.color].border} ${colorMap[lesson.color].light} hover:shadow-md transition-all animate-fade-in`}
                    >
                      <div className={`mr-4 p-3 rounded-full ${colorMap[lesson.color].bg}`}>
                        <Clock className={`h-5 w-5 ${colorMap[lesson.color].text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-semibold text-lg">{lesson.subject}</h3>
                          <Badge variant="outline" className={`${colorMap[lesson.color].text} ${colorMap[lesson.color].border}`}>
                            {lesson.time}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {lesson.teacher}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {lesson.room}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <Calendar className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Нет занятий</h3>
                    <p className="text-muted-foreground">На этот день не запланировано уроков</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <Button variant="outline" onClick={() => handlePrevPeriod()}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Предыдущий день
              </Button>
              <Button variant="outline" onClick={() => handleNextPeriod()}>
                Следующий день
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="month" className="m-0">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>
                {format(date, 'LLLL yyyy', { locale: ru })}
              </CardTitle>
              <CardDescription>
                Календарный вид расписания
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                  <div key={day} className="font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {emptyDays.map((day, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-square border rounded-md p-1 hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-right text-sm text-muted-foreground mb-1">
                      {idx + 1}
                    </div>
                    <div className="flex flex-col gap-1">
                      {idx < 5 && (
                        <div className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate">
                          8:30 Математика
                        </div>
                      )}
                      {idx < 3 && (
                        <div className="text-xs p-1 rounded bg-green-100 text-green-800 truncate">
                          10:20 Физика
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Нажмите на день, чтобы увидеть подробное расписание
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Экспорт календаря
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
};

export default Schedule;
