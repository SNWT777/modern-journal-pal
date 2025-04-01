
import React from "react";
import { Plus } from "lucide-react";
import ClassCard from "@/components/classes/ClassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const classesData = [
  {
    id: 1,
    name: "Алгебра 9A",
    subject: "Математика",
    teacher: "Елена Петровна",
    studentCount: 28,
    color: "bg-edu-blue"
  },
  {
    id: 2,
    name: "Геометрия 9A",
    subject: "Математика",
    teacher: "Елена Петровна",
    studentCount: 28,
    color: "bg-edu-blue"
  },
  {
    id: 3,
    name: "Физика 9A",
    subject: "Физика",
    teacher: "Андрей Иванович",
    studentCount: 26,
    color: "bg-edu-green"
  },
  {
    id: 4,
    name: "Химия 9А",
    subject: "Химия",
    teacher: "Мария Владимировна",
    studentCount: 25,
    color: "bg-edu-yellow"
  },
  {
    id: 5,
    name: "Литература 9A",
    subject: "Гуманитарные науки",
    teacher: "Ольга Сергеевна",
    studentCount: 30,
    color: "bg-edu-accent"
  },
  {
    id: 6,
    name: "Русский язык 9A",
    subject: "Гуманитарные науки",
    teacher: "Ольга Сергеевна",
    studentCount: 30,
    color: "bg-edu-accent"
  },
  {
    id: 7,
    name: "История 9A",
    subject: "Гуманитарные науки",
    teacher: "Дмитрий Александрович",
    studentCount: 27,
    color: "bg-edu-red"
  },
  {
    id: 8,
    name: "Информатика 9A",
    subject: "Информатика",
    teacher: "Сергей Павлович",
    studentCount: 24,
    color: "bg-edu-lightblue"
  }
];

const Classes = () => {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Classes</h1>
          <p className="text-muted-foreground">Manage all your classes and students</p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input placeholder="Search classes..." />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="humanities">Humanities</SelectItem>
            <SelectItem value="languages">Languages</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="active">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {classesData.map((classItem) => (
          <ClassCard key={classItem.id} {...classItem} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
