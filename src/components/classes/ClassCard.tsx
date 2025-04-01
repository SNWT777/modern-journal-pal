
import React from "react";
import { BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className={`h-3 ${color}`} />
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-muted-foreground">{subject}</p>
        <p className="text-sm mt-4">{teacher}</p>
        
        <div className="flex items-center mt-4 text-sm text-muted-foreground">
          <div className="flex items-center mr-4">
            <Users className="h-4 w-4 mr-1" />
            <span>{studentCount} students</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/40 p-4">
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full"
          onClick={() => navigate(`/classes/${id}`)}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          View Class
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClassCard;
