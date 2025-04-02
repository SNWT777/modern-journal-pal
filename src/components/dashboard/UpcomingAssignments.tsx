
import React, { useState } from "react";
import { CalendarRange, ChevronDown, ChevronUp, MoreHorizontal, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  description?: string;
  completed?: boolean;
}

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Математический тест",
    subject: "Математика",
    dueDate: "Завтра, 10:00",
    priority: "high",
    description: "Повторить теоремы из главы 5 и решить примеры со страниц 45-47."
  },
  {
    id: 2,
    title: "Эссе по литературе",
    subject: "Литература",
    dueDate: "25 мая",
    priority: "medium",
    description: "Написать эссе о главном герое произведения 'Война и мир', объем 2-3 страницы."
  },
  {
    id: 3,
    title: "Исследовательский проект",
    subject: "Биология",
    dueDate: "29 мая",
    priority: "low",
    description: "Подготовить исследовательский проект на тему 'Экосистемы', презентация 10-15 слайдов."
  },
  {
    id: 4,
    title: "Презентация",
    subject: "История",
    dueDate: "1 июня",
    priority: "medium",
    description: "Подготовить презентацию на тему 'Великие полководцы' с подробным описанием стратегий."
  }
];

const UpcomingAssignments = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const toggleCompleted = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
    );
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 card-hover">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <CalendarRange className="h-5 w-5 mr-2 text-primary" />
            Предстоящие задания
          </span>
          <Badge variant="outline" className="animate-pulse-light">
            {assignments.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {assignments.map((assignment) => (
            <Collapsible
              key={assignment.id}
              open={expanded === assignment.id}
              onOpenChange={() => toggleExpand(assignment.id)}
              className={`transition-all duration-300 ${
                completedTasks.includes(assignment.id) ? 'bg-muted/50 dark:bg-muted/20' : 'hover:bg-secondary/50'
              }`}
            >
              <div 
                className="flex items-start p-4 cursor-pointer"
                onClick={() => toggleExpand(assignment.id)}
              >
                <div className={`
                  p-2 rounded-full mr-3 shrink-0
                  ${assignment.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 
                    assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}
                `}>
                  {completedTasks.includes(assignment.id) ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <CalendarRange className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium truncate ${completedTasks.includes(assignment.id) ? 'line-through text-muted-foreground' : ''}`}>
                      {assignment.title}
                    </h4>
                    <div className="flex items-center ml-2 space-x-1">
                      <CollapsibleTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          {expanded === assignment.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => toggleCompleted(assignment.id, e)}>
                            {completedTasks.includes(assignment.id) ? "Отметить как незавершенное" : "Отметить как завершенное"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>Открыть задание</DropdownMenuItem>
                          <DropdownMenuItem>Добавить напоминание</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">{assignment.dueDate}</span>
                  </div>
                </div>
              </div>
              <CollapsibleContent className="px-4 pb-4 pt-0 animate-slide-down ml-12">
                <div className="border-l-2 border-primary/30 pl-3 text-sm text-muted-foreground">
                  {assignment.description}
                </div>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs">Открыть задание</Button>
                  <Button size="sm" variant="ghost" className="text-xs" onClick={(e) => toggleCompleted(assignment.id, e)}>
                    {completedTasks.includes(assignment.id) ? "Вернуть" : "Завершить"}
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        <div className="p-3 bg-secondary/50 flex justify-center">
          <Button variant="ghost" size="sm" className="w-full text-primary">
            Показать все задания
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAssignments;
