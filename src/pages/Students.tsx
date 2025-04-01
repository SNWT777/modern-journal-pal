
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, MoreVertical, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";

// Sample student data
const STUDENTS = [
  { id: 1, name: "Иванов Иван", class: "11A", role: "Ученик", email: "ivan@school.ru", phone: "+7 (900) 123-45-67", status: "active" },
  { id: 2, name: "Петров Петр", class: "10Б", role: "Ученик", email: "petr@school.ru", phone: "+7 (900) 987-65-43", status: "active" },
  { id: 3, name: "Сидорова Анна", class: "9В", role: "Ученик", email: "anna@school.ru", phone: "+7 (900) 456-78-90", status: "inactive" },
  { id: 4, name: "Смирнов Алексей", class: "11A", role: "Ученик", email: "alex@school.ru", phone: "+7 (900) 111-22-33", status: "active" },
  { id: 5, name: "Кузнецова Елена", class: "10Б", role: "Ученик", email: "elena@school.ru", phone: "+7 (900) 444-55-66", status: "active" },
  { id: 6, name: "Попов Дмитрий", class: "9В", role: "Ученик", email: "dmitry@school.ru", phone: "+7 (900) 777-88-99", status: "active" },
  { id: 7, name: "Лебедева Ольга", class: "11Б", role: "Ученик", email: "olga@school.ru", phone: "+7 (900) 333-22-11", status: "inactive" },
  { id: 8, name: "Козлов Максим", class: "10A", role: "Ученик", email: "maxim@school.ru", phone: "+7 (900) 555-44-33", status: "active" },
];

// Sample class options
const CLASS_OPTIONS = ["11A", "11Б", "10A", "10Б", "9A", "9Б", "9В"];

const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // Filter students based on search and class filter
  const filteredStudents = STUDENTS.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Ученик успешно добавлен");
    setIsAddStudentOpen(false);
  };

  return (
    <div className="container p-6 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ученики</h1>
          <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Добавить ученика</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Добавить нового ученика</DialogTitle>
                <DialogDescription>
                  Добавьте данные нового ученика. После добавления ученик получит доступ к системе.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddStudent}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя</Label>
                      <Input id="firstName" placeholder="Иван" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input id="lastName" placeholder="Иванов" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="ivan@school.ru" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (900) 123-45-67" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Класс</Label>
                    <Select>
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Выберите класс" />
                      </SelectTrigger>
                      <SelectContent>
                        {CLASS_OPTIONS.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddStudentOpen(false)}>
                    Отмена
                  </Button>
                  <Button type="submit">Добавить</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Управление учениками</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени или email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Все классы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все классы</SelectItem>
                  {CLASS_OPTIONS.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ученик</TableHead>
                    <TableHead>Класс</TableHead>
                    <TableHead>Контактная информация</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Ученики не найдены
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <GraduationCap className="h-3 w-3" />
                                <span>{student.role}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.class}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{student.email}</div>
                            <div className="text-muted-foreground">{student.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                            {student.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Действия</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => toast.info(`Просмотр профиля ${student.name}`)}>
                                Просмотреть профиль
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info(`Редактирование ученика ${student.name}`)}>
                                Редактировать
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success(`Статус ученика ${student.name} изменен`)}>
                                {student.status === 'active' ? 'Деактивировать' : 'Активировать'}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive" 
                                onClick={() => toast.error(`Ученик ${student.name} удален`)}
                              >
                                Удалить
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentsPage;
