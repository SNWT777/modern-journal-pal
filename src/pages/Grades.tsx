
import React, { useState } from "react";
import { FileText, Plus, Search, Filter } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import GradeStudentForm from "@/components/grades/GradeStudentForm";
import { toast } from "sonner";

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
  const [gradeData, setGradeData] = useState(initialGradeData);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [addGradeOpen, setAddGradeOpen] = useState(false);
  
  // Get unique classes from grade data
  const uniqueClasses = Array.from(new Set(gradeData.map(record => record.class)));
  
  // Handle adding a new grade
  const handleGradeSubmitted = (data: any) => {
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gradient">Оценки</h1>
          <p className="text-muted-foreground">Просмотр и управление оценками учеников</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 blue-white-button"
          onClick={() => setAddGradeOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Выставить оценку
        </Button>
      </div>
      
      <Card className="mb-8 blue-white-card animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5 text-primary" />
            Фильтры оценок
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Поиск по ученику или заданию..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              defaultValue="all"
              value={classFilter}
              onValueChange={setClassFilter}
            >
              <SelectTrigger className="w-full md:w-[200px]">
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
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Оценка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все оценки</SelectItem>
                <SelectItem value="a">A (Отлично)</SelectItem>
                <SelectItem value="b">B (Хорошо)</SelectItem>
                <SelectItem value="c">C (Удовлетворительно)</SelectItem>
                <SelectItem value="d">D (Неудовлетворительно)</SelectItem>
                <SelectItem value="f">F (Неудовлетворительно)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card className="blue-white-card animate-slide-in">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Журнал оценок
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredGrades.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground mb-2">Оценки не найдены</p>
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
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
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
                    className={`staggered-item staggered-fade-in transition-colors hover:bg-muted/30 cursor-pointer`}
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
          )}
        </CardContent>
      </Card>
      
      <GradeStudentForm 
        open={addGradeOpen} 
        onOpenChange={setAddGradeOpen} 
        className="Алгебра 9А"
        onGradeSubmitted={handleGradeSubmitted}
      />
    </div>
  );
};

export default Grades;
