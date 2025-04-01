
import React from "react";
import { CalendarRange } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Математический тест",
    subject: "Математика",
    dueDate: "Завтра, 10:00",
    priority: "high"
  },
  {
    id: 2,
    title: "Эссе по литературе",
    subject: "Литература",
    dueDate: "25 мая",
    priority: "medium"
  },
  {
    id: 3,
    title: "Исследовательский проект",
    subject: "Биология",
    dueDate: "29 мая",
    priority: "low"
  },
  {
    id: 4,
    title: "Презентация",
    subject: "История",
    dueDate: "1 июня",
    priority: "medium"
  }
];

const UpcomingAssignments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div 
              key={assignment.id}
              className="flex items-start p-3 rounded-lg border bg-card hover:bg-secondary/50 transition-colors"
            >
              <div className={`
                p-2 rounded-full mr-3 
                ${assignment.priority === 'high' ? 'bg-red-100 text-red-600' : 
                  assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'}
              `}>
                <CalendarRange className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{assignment.title}</h4>
                <p className="text-sm text-muted-foreground">{assignment.subject}</p>
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {assignment.dueDate}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAssignments;
