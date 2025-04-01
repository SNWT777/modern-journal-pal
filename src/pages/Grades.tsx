
import React from "react";
import { Search } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface GradeRecord {
  id: number;
  student: string;
  class: string;
  assignment: string;
  grade: string;
  submitted: string;
  graded: string;
}

const gradeData: GradeRecord[] = [
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
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Grades</h1>
        <p className="text-muted-foreground">View and manage all student grades</p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filter Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by student or assignment..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="d">D</SelectItem>
                <SelectItem value="f">F</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Graded</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradeData.map((record) => (
                <TableRow key={record.id}>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Grades;
