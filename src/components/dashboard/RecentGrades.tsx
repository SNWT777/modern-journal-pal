
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GradeData {
  id: number;
  student: string;
  class: string;
  assignment: string;
  grade: string;
  date: string;
}

const gradeData: GradeData[] = [
  {
    id: 1,
    student: "Иван Петров",
    class: "Математика",
    assignment: "Контрольная работа №3",
    grade: "A",
    date: "15.05.2023"
  },
  {
    id: 2,
    student: "Анна Смирнова",
    class: "Физика",
    assignment: "Лабораторная работа",
    grade: "B+",
    date: "14.05.2023"
  },
  {
    id: 3,
    student: "Михаил Иванов",
    class: "История",
    assignment: "Эссе на тему...",
    grade: "A-",
    date: "13.05.2023"
  },
  {
    id: 4,
    student: "Елена Козлова",
    class: "Литература",
    assignment: "Анализ произведения",
    grade: "B",
    date: "12.05.2023"
  },
  {
    id: 5,
    student: "Дмитрий Соколов",
    class: "Информатика",
    assignment: "Практическое задание",
    grade: "A+",
    date: "11.05.2023"
  }
];

const RecentGrades = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Grades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradeData.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium">{grade.student}</TableCell>
                <TableCell>{grade.class}</TableCell>
                <TableCell>{grade.assignment}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
                    grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                    grade.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {grade.grade}
                  </span>
                </TableCell>
                <TableCell>{grade.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentGrades;
