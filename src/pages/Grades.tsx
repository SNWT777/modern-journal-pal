
import React, { useState } from "react";
import { FileText, Plus, Search, Filter, Download, BarChart3, Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import GradeStudentForm from "@/components/grades/GradeStudentForm";
import { GradesStatistics } from "@/components/grades/GradesStatistics";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

interface GradeRecord {
  id: number;
  student: string;
  class: string;
  assignment: string;
  grade: string;
  submitted: string;
  graded: string;
}

const initialGradeData: GradeRecord[] = [
  {
    id: 1,
    student: "Иван Петров",
    class: "Математика",
    assignment: "Контрольная работа №3",
    grade: "A",
    submitted: "14.05.2023",
    graded: "15.05.2023"
  },
  {
    id: 2,
    student: "Анна Смирнова",
    class: "Физика",
    assignment: "Лабораторная работа",
    grade: "B+",
    submitted: "13.05.2023",
    graded: "14.05.2023"
  },
  {
    id: 3,
    student: "Михаил Иванов",
    class: "История",
    assignment: "Эссе на тему...",
    grade: "A-",
    submitted: "12.05.2023",
    graded: "13.05.2023"
  },
  {
    id: 4,
    student: "Елена Козлова",
    class: "Литература",
    assignment: "Анализ произведения",
    grade: "B",
    submitted: "11.05.2023",
    graded: "12.05.2023"
  },
  {
    id: 5,
    student: "Дмитрий Соколов",
    class: "Информатика",
    assignment: "Практическое задание",
    grade: "A+",
    submitted: "10.05.2023",
    graded: "11.05.2023"
  },
  {
    id: 6,
    student: "Ольга Новикова",
    class: "Химия",
    assignment: "Лабораторная работа",
    grade: "B-",
    submitted: "09.05.2023",
    graded: "10.05.2023"
  },
  {
    id: 7,
    student: "Алексей Морозов",
    class: "Физика",
    assignment: "Тест по механике",
    grade: "C+",
    submitted: "08.05.2023",
    graded: "09.05.2023"
  },
  {
    id: 8,
    student: "Наталья Волкова",
    class: "Биология",
    assignment: "Исследовательский проект",
    grade: "A",
    submitted: "07.05.2023",
    graded: "08.05.2023"
  },
  {
    id: 9,
    student: "Сергей Попов",
    class: "Математика",
    assignment: "Задачи повышенной сложности",
    grade: "B+",
    submitted: "06.05.2023",
    graded: "07.05.2023"
  },
  {
    id: 10,
    student: "Екатерина Соловьева",
    class: "Русский язык",
    assignment: "Сочинение",
    grade: "A-",
    submitted: "05.05.2023",
    graded: "06.05.2023"
  }
];

const Grades = () => {
  const { user } = useAuth();
  const [gradeData, setGradeData] = useState(initialGradeData);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [addGradeOpen, setAddGradeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("recent");
  
  // Check if user has teacher/admin role
  const canAssignGrades = user?.role === "teacher" || user?.role === "admin";
  
  // Get unique classes from grade data
  const uniqueClasses = Array.from(new Set(gradeData.map(record => record.class)));
  
  // Handle adding a new grade
  const handleGradeSubmitted = (data: any) => {
    if (!canAssignGrades) return;
    
    // Find student and assignment names from mock data
    const studentName = data.student === "1" ? "Иван Петров" : 
                        data.student === "2" ? "Анна Смирнова" : 
                        data.student === "3" ? "Михаил Иванов" : 
                        data.student === "4" ? "Елена Козлова" : "Дмитрий Соколов";
                        
    const assignmentName = data.assignment === "1" ? "Контрольная работа №1" : 
                           data.assignment === "2" ? "Домашнее задание №3" : 
                           data.assignment === "3" ? "Тест по теме «Многочлены»" : 
                           data.assignment === "4" ? "Самостоятельная работа" : "Итоговый проект";
    
    // Convert numeric grade to letter grade
    const letterGrade = data.grade === "5" ? "A" : 
                        data.grade === "4" ? "B+" : 
                        data.grade === "3" ? "C" : 
                        data.grade === "2" ? "D" : 
                        data.grade === "Н" ? "Н" : "Зачет";
    
    // Create a date for today
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
    
    // Create new grade record
    const newGrade: GradeRecord = {
      id: gradeData.length + 1,
      student: studentName,
      class: "Математика", // Default for this example
      assignment: assignmentName,
      grade: letterGrade,
      submitted: formattedDate,
      graded: formattedDate
    };
    
    // Add to grade data
    setGradeData([newGrade, ...gradeData]);
    toast.success(`Оценка ${letterGrade} выставлена для ${studentName}`);
  };
  
  // Handle attempt to create grade by non-teacher
  const handleAddGradeClick = () => {
    if (canAssignGrades) {
      setAddGradeOpen(true);
    } else {
      toast.error("Только учителя могут выставлять оценки");
    }
  };
  
  // Filter grades based on search and filters
  const filteredGrades = gradeData.filter(record => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      record.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.assignment.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Class filter
    const matchesClass = classFilter === "all" || 
      record.class.toLowerCase() === classFilter.toLowerCase();
    
    // Grade filter
    const matchesGrade = gradeFilter === "all" || 
      record.grade.startsWith(gradeFilter.toUpperCase());
    
    return matchesSearch && matchesClass && matchesGrade;
  });

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      {/* Header Section */}
      <div className="relative mb-8 p-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Журнал оценок</h1>
          <p className="opacity-90">Полный контроль успеваемости учеников</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white py-1">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Все оценки успешно синхронизированы
            </Badge>
            <Badge variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white py-1">
              Последнее обновление: сегодня в 9:42
            </Badge>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M50 0H100V100H0V50C0 22.3858 22.3858 0 50 0Z" fill="white"/>
            <path d="M80 40H20V60H80V40Z" fill="white"/>
            <path d="M80 20H20V30H80V20Z" fill="white"/>
            <path d="M80 70H20V80H80V70Z" fill="white"/>
          </svg>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full sm:w-auto"
        >
          <TabsList className="bg-blue-50 dark:bg-blue-900/20 p-1">
            <TabsTrigger value="recent" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800">
              Последние оценки
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800">
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="missing" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800">
              Пропуски
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Экспорт
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Экспорт в Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Экспорт в PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Выбрать период
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            className="gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleAddGradeClick}
          >
            <Plus className="h-4 w-4" />
            Выставить оценку
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <TabsContent value="recent" className="mt-0">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-0 flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    Журнал оценок
                  </CardTitle>
                  <CardDescription>
                    Всего записей: {filteredGrades.length}
                  </CardDescription>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Select 
                    defaultValue="all"
                    value={classFilter}
                    onValueChange={setClassFilter}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Класс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все классы</SelectItem>
                      {uniqueClasses.map((className, index) => (
                        <SelectItem key={index} value={className.toLowerCase()}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    defaultValue="all"
                    value={gradeFilter}
                    onValueChange={setGradeFilter}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Оценка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все оценки</SelectItem>
                      <SelectItem value="a">A (Отлично)</SelectItem>
                      <SelectItem value="b">B (Хорошо)</SelectItem>
                      <SelectItem value="c">C (Удовлетворительно)</SelectItem>
                      <SelectItem value="d">D (Неудовлетворительно)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 mt-6">
                <div className="relative px-6">
                  <div className="absolute inset-y-0 left-6 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input 
                    placeholder="Поиск по ученику или заданию..." 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {filteredGrades.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Оценки не найдены</h3>
                    <p className="text-muted-foreground mb-4">По заданным критериям не найдено ни одной оценки</p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setClassFilter("all");
                        setGradeFilter("all");
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                          <TableHead>Ученик</TableHead>
                          <TableHead>Класс</TableHead>
                          <TableHead>Задание</TableHead>
                          <TableHead>Оценка</TableHead>
                          <TableHead>Сдано</TableHead>
                          <TableHead>Проверено</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGrades.map((record, index) => (
                          <TableRow 
                            key={record.id}
                            className={`transition-colors hover:bg-blue-50/50 cursor-pointer staggered-item staggered-fade-in`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <TableCell className="font-medium">{record.student}</TableCell>
                            <TableCell>{record.class}</TableCell>
                            <TableCell>{record.assignment}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                record.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                                record.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                                record.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {record.grade}
                              </span>
                            </TableCell>
                            <TableCell>{record.submitted}</TableCell>
                            <TableCell>{record.graded}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between border-t p-4 mt-4">
                <div className="text-sm text-muted-foreground">
                  Показано {filteredGrades.length} из {gradeData.length} записей
                </div>
                <Button variant="outline" size="sm">
                  Загрузить еще
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-0">
            <GradesStatistics />
          </TabsContent>
          
          <TabsContent value="missing" className="mt-0">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Пропуски занятий</CardTitle>
                <CardDescription>
                  Учет посещаемости и пропусков
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Данные о пропусках будут доступны в следующем обновлении</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
        
        <div>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                Общая статистика
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Средний балл</span>
                    <span className="font-medium">4.2</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: '84%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Количество оценок</span>
                    <span className="font-medium">{gradeData.length}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1 mt-2">
                    {['A', 'B', 'C', 'D', 'F'].map((grade) => {
                      const count = gradeData.filter(g => g.grade.startsWith(grade)).length;
                      const percentage = (count / gradeData.length) * 100;
                      
                      return (
                        <div key={grade} className="text-center">
                          <div className="h-16 bg-gray-100 rounded-md relative mb-1">
                            <div 
                              className={`absolute bottom-0 left-0 right-0 rounded-md ${
                                grade === 'A' ? 'bg-green-500' : 
                                grade === 'B' ? 'bg-blue-500' :
                                grade === 'C' ? 'bg-yellow-500' :
                                grade === 'D' ? 'bg-orange-500' :
                                'bg-red-500'
                              }`} 
                              style={{ height: `${percentage || 1}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{grade}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium mb-2">Последние действия</h4>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="text-xs flex gap-2 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Добавлена оценка для {gradeData[i]?.student}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {canAssignGrades && (
        <GradeStudentForm 
          open={addGradeOpen} 
          onOpenChange={setAddGradeOpen} 
          className="Алгебра 9А"
          onGradeSubmitted={handleGradeSubmitted}
        />
      )}
    </div>
  );
};

export default Grades;
