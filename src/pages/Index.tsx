
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, GraduationCap, Star, Bell } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Добро пожаловать в Школьный Журнал
        </h1>
        <p className="text-muted-foreground">Ваш современный образовательный портал</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Мои Уроки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
            <p className="text-muted-foreground text-sm">учебных предмета</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="mr-2 h-5 w-5 text-yellow-500" />
              Средний Балл
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.7</p>
            <p className="text-muted-foreground text-sm">из 5.0</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-green-500" />
              Посещаемость
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">98%</p>
            <p className="text-muted-foreground text-sm">за последний месяц</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Bell className="mr-2 h-5 w-5 text-accent" />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
            <p className="text-muted-foreground text-sm">новых сообщений</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>Расписание на сегодня</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "8:30 - 9:15", subject: "Математика", teacher: "Петрова Е.А.", room: "Кабинет 215" },
                { time: "9:25 - 10:10", subject: "История", teacher: "Иванов Д.С.", room: "Кабинет 310" },
                { time: "10:20 - 11:05", subject: "Физика", teacher: "Смирнов А.В.", room: "Кабинет 118" },
                { time: "11:25 - 12:10", subject: "Литература", teacher: "Козлова М.И.", room: "Кабинет 207" }
              ].map((lesson, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="bg-primary/10 rounded-full p-2 mr-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{lesson.subject}</div>
                    <div className="text-sm text-muted-foreground">{lesson.teacher} • {lesson.room}</div>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">{lesson.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">Показать полное расписание</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>Последние оценки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Математика", grade: "5", date: "14 мая" },
                { subject: "Физика", grade: "4", date: "12 мая" },
                { subject: "История", grade: "5", date: "10 мая" },
                { subject: "Биология", grade: "4", date: "9 мая" },
                { subject: "Литература", grade: "5", date: "7 мая" }
              ].map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span>{grade.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${
                      grade.grade === "5" ? "text-green-500" : 
                      grade.grade === "4" ? "text-blue-500" : 
                      grade.grade === "3" ? "text-yellow-500" : 
                      "text-red-500"
                    }`}>{grade.grade}</span>
                    <span className="text-xs text-muted-foreground">{grade.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">Показать все оценки</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>Домашние задания</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { subject: "Математика", task: "Упражнения 45-47, стр. 120", deadline: "Завтра" },
                { subject: "Литература", task: "Читать главу 5, роман 'Война и мир'", deadline: "15 мая" },
                { subject: "Физика", task: "Решить задачи 1-5, стр. 78", deadline: "16 мая" }
              ].map((homework, index) => (
                <div key={index} className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {homework.subject}
                  </div>
                  <div className="text-sm mt-1">{homework.task}</div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Срок сдачи: {homework.deadline}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">Все задания</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>Успеваемость по предметам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: "Математика", progress: 92 },
                { subject: "Русский язык", progress: 85 },
                { subject: "Физика", progress: 78 },
                { subject: "История", progress: 90 },
                { subject: "Английский язык", progress: 88 }
              ].map((subject, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{subject.subject}</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        subject.progress > 90 ? "bg-green-500" :
                        subject.progress > 80 ? "bg-blue-500" :
                        subject.progress > 70 ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">Подробная статистика</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
