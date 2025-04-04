
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Calendar as CalendarIcon, Clock, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useAuth } from "@/hooks/use-auth";

const mockClasses = [
  { id: 1, name: "Математика 9А", date: "2025-04-04", status: "present", time: "08:30 - 09:15" },
  { id: 2, name: "Физика 9А", date: "2025-04-04", status: "late", time: "09:30 - 10:15", lateMinutes: 10 },
  { id: 3, name: "Литература 9А", date: "2025-04-04", status: "absent", time: "10:30 - 11:15", reason: "Болезнь" },
  { id: 4, name: "Информатика 9А", date: "2025-04-03", status: "present", time: "08:30 - 09:15" },
  { id: 5, name: "Химия 9А", date: "2025-04-03", status: "present", time: "09:30 - 10:15" },
  { id: 6, name: "История 9А", date: "2025-04-03", status: "absent", time: "10:30 - 11:15", reason: "Соревнования" },
  { id: 7, name: "География 9А", date: "2025-04-02", status: "present", time: "08:30 - 09:15" },
  { id: 8, name: "Английский язык 9А", date: "2025-04-02", status: "late", time: "09:30 - 10:15", lateMinutes: 5 },
];

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tab, setTab] = useState("calendar");
  const { user } = useAuth();
  const isTeacher = user?.role === "teacher" || user?.role === "admin";

  const countByStatus = {
    present: mockClasses.filter(c => c.status === "present").length,
    late: mockClasses.filter(c => c.status === "late").length,
    absent: mockClasses.filter(c => c.status === "absent").length,
  };

  const attendanceRate = Math.round(
    (countByStatus.present + countByStatus.late) / mockClasses.length * 100
  );

  const filteredClasses = mockClasses.filter(cls => {
    if (!date) return true;
    return cls.date === format(date, "yyyy-MM-dd");
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge variant="default" className="bg-green-500">Присутствовал</Badge>;
      case "late":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Опоздание</Badge>;
      case "absent":
        return <Badge variant="destructive">Отсутствовал</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Посещаемость</h1>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: ru })
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              locale={ru}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-600 dark:text-green-400 flex items-center text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 mr-1" /> Присутствие
            </CardDescription>
            <CardTitle className="text-2xl">{countByStatus.present} занятий</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-amber-600 dark:text-amber-400 flex items-center text-sm font-medium">
              <Clock className="h-4 w-4 mr-1" /> Опоздания
            </CardDescription>
            <CardTitle className="text-2xl">{countByStatus.late} занятий</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-950 dark:to-red-900">
          <CardHeader className="pb-2">
            <CardDescription className="text-red-600 dark:text-red-400 flex items-center text-sm font-medium">
              <AlertCircle className="h-4 w-4 mr-1" /> Пропуски
            </CardDescription>
            <CardTitle className="text-2xl">{countByStatus.absent} занятий</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-1">
          <CardTitle>Журнал посещаемости - {attendanceRate}% присутствия</CardTitle>
          <CardDescription>
            {isTeacher 
              ? "Отметьте присутствие учеников на занятиях" 
              : "История ваших посещений занятий"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {filteredClasses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Предмет</TableHead>
                  <TableHead>Время</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Примечание</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id} className="group hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.time}</TableCell>
                    <TableCell>{getStatusBadge(cls.status)}</TableCell>
                    <TableCell>
                      {cls.status === "late" && `Опоздание на ${cls.lateMinutes} минут`}
                      {cls.status === "absent" && cls.reason}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Нет данных о посещаемости на выбранную дату</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
