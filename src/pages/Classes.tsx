
import React, { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import ClassCard from "@/components/classes/ClassCard";
import CreateClassForm from "@/components/classes/CreateClassForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

// Initial class data
const initialClassesData = [
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
  const { user } = useAuth();
  const [classesData, setClassesData] = useState(initialClassesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [createClassOpen, setCreateClassOpen] = useState(false);
  
  // Check if user has teacher/admin role
  const canCreateClass = user?.role === "teacher" || user?.role === "admin";
  
  // Handle class creation
  const handleClassCreated = (data: any) => {
    const newClass = {
      id: classesData.length + 1,
      name: data.name,
      subject: data.subject,
      teacher: user?.name || "Преподаватель",
      studentCount: 0,
      color: data.color
    };
    
    setClassesData([...classesData, newClass]);
  };
  
  // Handle attempt to create class by non-teacher
  const handleCreateClassClick = () => {
    if (canCreateClass) {
      setCreateClassOpen(true);
    } else {
      toast.error("Только учителя могут создавать классы");
    }
  };
  
  // Filter classes based on search and filters
  const filteredClasses = classesData.filter(classItem => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Subject filter
    const matchesSubject = subjectFilter === "all" || 
      classItem.subject.toLowerCase() === subjectFilter.toLowerCase();
    
    // For this example, we'll assume all classes are active
    const matchesStatus = statusFilter === "all" || statusFilter === "active";
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gradient">Классы</h1>
          <p className="text-muted-foreground">Управление классами и учащимися</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 blue-white-button" 
          onClick={handleCreateClassClick}
        >
          <Plus className="mr-2 h-4 w-4" />
          Добавить класс
        </Button>
      </div>
      
      <div className="blue-card p-6 mb-8 animate-scale-in">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <Filter className="mr-2 h-5 w-5 text-primary" />
          Фильтры
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Поиск классов..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select 
            defaultValue="all"
            value={subjectFilter}
            onValueChange={setSubjectFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Предмет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все предметы</SelectItem>
              <SelectItem value="математика">Математика</SelectItem>
              <SelectItem value="физика">Физика</SelectItem>
              <SelectItem value="химия">Химия</SelectItem>
              <SelectItem value="гуманитарные науки">Гуманитарные науки</SelectItem>
              <SelectItem value="информатика">Информатика</SelectItem>
            </SelectContent>
          </Select>
          <Select 
            defaultValue="active"
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="archived">В архиве</SelectItem>
              <SelectItem value="all">Все</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredClasses.length === 0 ? (
        <div className="text-center py-12 blue-card">
          <h3 className="text-xl font-medium mb-2">Классы не найдены</h3>
          <p className="text-muted-foreground mb-4">По заданным критериям не найдено ни одного класса</p>
          <Button 
            onClick={() => {
              setSearchQuery("");
              setSubjectFilter("all");
              setStatusFilter("active");
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClasses.map((classItem, index) => (
            <div 
              key={classItem.id} 
              className="staggered-item staggered-fade-in" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ClassCard {...classItem} />
            </div>
          ))}
        </div>
      )}
      
      {canCreateClass && (
        <CreateClassForm 
          open={createClassOpen} 
          onOpenChange={setCreateClassOpen}
          onClassCreated={handleClassCreated}
        />
      )}
    </div>
  );
};

export default Classes;
