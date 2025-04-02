
import React, { useState } from "react";
import { BookOpen, Users, ChevronRight, Calendar, Clock, GraduationCap } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ClassCardProps {
  id: number;
  name: string;
  subject: string;
  teacher: string;
  studentCount: number;
  color: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  name,
  subject,
  teacher,
  studentCount,
  color
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  // Mock data for class card
  const nextLesson = "Сегодня, 13:45";
  const completionPercentage = 68;
  const hasAssignments = Math.random() > 0.5;

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg relative hover-scale",
        isHovered && "shadow-xl"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-3 ${color}`} />
      <div className={`absolute top-3 right-0 w-24 h-24 rounded-full ${color} opacity-10 -translate-y-12 translate-x-8`} />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1 transition-colors group">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent">
                {name}
              </span>
            </h3>
            <p className="text-muted-foreground">{subject}</p>
          </div>
          {hasAssignments && (
            <Badge variant="destructive" className="animate-pulse">
              Новые задания
            </Badge>
          )}
        </div>
        
        <p className="text-sm mt-4 flex items-center">
          <GraduationCap className="h-4 w-4 mr-1.5 text-primary" />
          <span>{teacher}</span>
        </p>
        
        <div className="flex items-center mt-4 text-sm text-muted-foreground">
          <div className="flex items-center mr-4">
            <Users className="h-4 w-4 mr-1" />
            <span>{studentCount} учеников</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col space-y-2">
          <div className="text-sm flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1.5" />
            <span>Следующий урок: {nextLesson}</span>
          </div>
          
          <div className="text-sm flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1.5" />
            <span>Прогресс: {completionPercentage}%</span>
          </div>
          
          <div className="w-full bg-secondary h-1.5 rounded-full mt-1 overflow-hidden">
            <div 
              className={`h-full rounded-full ${color.replace('bg-', 'bg-')} transition-all duration-1000 ease-in-out`} 
              style={{ width: `${completionPercentage}%` }} 
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/40 p-4">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full group"
          onClick={() => navigate(`/classes/${id}`)}
        >
          <BookOpen className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
          <span>Открыть класс</span>
          <ChevronRight className="h-4 w-4 ml-auto transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
