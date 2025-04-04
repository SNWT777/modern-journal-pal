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
import { useClasses, ClassData } from "@/hooks/use-classes";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Classes = () => {
  const { user } = useAuth();
  const { classes, loading, createClass } = useClasses();
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [createClassOpen, setCreateClassOpen] = useState(false);
  
  const canCreateClass = user?.role === "teacher" || user?.role === "admin";
  
  const handleClassCreated = (data: any) => {
    if (!canCreateClass) return;
    
    createClass({
      name: data.name,
      subject: data.subject,
      color: data.color
    });
    
    setCreateClassOpen(false);
  };
  
  const handleCreateClassClick = () => {
    if (canCreateClass) {
      setCreateClassOpen(true);
    } else {
      toast.error("Только учителя могут создавать классы");
    }
  };
  
  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = searchQuery === "" || 
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = subjectFilter === "all" || 
      classItem.subject.toLowerCase() === subjectFilter.toLowerCase();
    
    const matchesStatus = statusFilter === "all" || statusFilter === "active";
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const uniqueSubjects = Array.from(new Set(classes.map(c => c.subject)));

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
              {uniqueSubjects.map((subject) => (
                <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
              ))}
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
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[200px]">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      ) : filteredClasses.length === 0 ? (
        <div className="text-center py-12 blue-card">
          <h3 className="text-xl font-medium mb-2">Классы не найдены</h3>
          <p className="text-muted-foreground mb-4">
            {classes.length === 0
              ? "У вас еще нет классов. Создайте первый класс!"
              : "По заданным критериям не найдено ни одного класса"}
          </p>
          {classes.length === 0 && canCreateClass ? (
            <Button onClick={() => setCreateClassOpen(true)}>
              Создать первый класс
            </Button>
          ) : classes.length > 0 ? (
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSubjectFilter("all");
                setStatusFilter("active");
              }}
            >
              Сбросить фильтры
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClasses.map((classItem, index) => (
            <div 
              key={classItem.id} 
              className="staggered-item staggered-fade-in" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ClassCard 
                id={classItem.id}
                name={classItem.name}
                subject={classItem.subject}
                teacher={classItem.teacher_name || "Преподаватель"} 
                studentCount={Number(classItem.student_count) || 0}
                color={classItem.color}
              />
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
