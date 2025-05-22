
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
import { useGrades } from "@/hooks/use-grades";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const RecentGrades = () => {
  const { grades, loading } = useGrades();
  const { user } = useAuth();
  
  // Show only the most recent 5 grades
  const recentGrades = grades.slice(0, 5);

  // Format date from ISO string to readable format
  const formatGradeDate = (dateString: string) => {
    try {
      return formatDate(new Date(dateString));
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {user?.role === "student" ? "Ваши недавние оценки" : "Недавно выставленные оценки"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : recentGrades.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">Нет доступных оценок</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{user?.role === "student" ? "Предмет" : "Ученик"}</TableHead>
                <TableHead>Класс</TableHead>
                <TableHead>Задание</TableHead>
                <TableHead>Оценка</TableHead>
                <TableHead>Дата</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">
                    {user?.role === "student" ? grade.assignment_name : grade.student_name}
                  </TableCell>
                  <TableCell>{grade.class_name}</TableCell>
                  <TableCell>{grade.assignment_name || "Не указано"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      grade.grade === "5" || grade.grade === "A" || grade.grade === "A+" || grade.grade === "A-" ? 'bg-success/10 text-success' : 
                      grade.grade === "4" || grade.grade === "B" || grade.grade === "B+" || grade.grade === "B-" ? 'bg-info/10 text-info' :
                      grade.grade === "3" || grade.grade === "C" || grade.grade === "C+" || grade.grade === "C-" ? 'bg-warning/10 text-warning' :
                      grade.grade === "Зачет" ? 'bg-accent/10 text-accent' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {grade.grade}
                    </span>
                  </TableCell>
                  <TableCell>{formatGradeDate(grade.graded_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentGrades;
