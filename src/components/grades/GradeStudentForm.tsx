
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, FileText, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const gradeFormSchema = z.object({
  student: z.string().min(1, {
    message: "Выберите ученика",
  }),
  assignment: z.string().min(1, {
    message: "Выберите задание",
  }),
  grade: z.string().min(1, {
    message: "Выберите оценку",
  }),
  feedback: z.string().optional(),
});

type GradeFormValues = z.infer<typeof gradeFormSchema>;

interface GradeStudentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classId?: number;
  className?: string;
  onGradeSubmitted?: (data: GradeFormValues) => void;
}

const defaultValues: Partial<GradeFormValues> = {
  feedback: "",
};

// Mock data for the form
const mockStudents = [
  { id: "1", name: "Иван Петров" },
  { id: "2", name: "Анна Смирнова" },
  { id: "3", name: "Михаил Иванов" },
  { id: "4", name: "Елена Козлова" },
  { id: "5", name: "Дмитрий Соколов" },
];

const mockAssignments = [
  { id: "1", name: "Контрольная работа №1" },
  { id: "2", name: "Домашнее задание №3" },
  { id: "3", name: "Тест по теме «Многочлены»" },
  { id: "4", name: "Самостоятельная работа" },
  { id: "5", name: "Итоговый проект" },
];

const GradeStudentForm: React.FC<GradeStudentFormProps> = ({ 
  open, 
  onOpenChange,
  classId,
  className,
  onGradeSubmitted
}) => {
  const form = useForm<GradeFormValues>({
    resolver: zodResolver(gradeFormSchema),
    defaultValues,
  });

  function onSubmit(data: GradeFormValues) {
    toast.success("Оценка успешно выставлена!");
    if (onGradeSubmitted) {
      onGradeSubmitted(data);
    }
    form.reset(defaultValues);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-primary" />
            Выставление оценки
          </DialogTitle>
          <DialogDescription>
            {className && <span className="font-medium text-primary">{className}</span>}
            {className && ' — '}
            Заполните форму для выставления оценки ученику
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="student"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ученик</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите ученика" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="assignment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Задание</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите задание" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockAssignments.map((assignment) => (
                        <SelectItem key={assignment.id} value={assignment.id}>
                          {assignment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Оценка</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите оценку" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5">5 (Отлично)</SelectItem>
                      <SelectItem value="4">4 (Хорошо)</SelectItem>
                      <SelectItem value="3">3 (Удовлетворительно)</SelectItem>
                      <SelectItem value="2">2 (Неудовлетворительно)</SelectItem>
                      <SelectItem value="Н">Н (Не явился)</SelectItem>
                      <SelectItem value="Зачет">Зачет</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Комментарий (необязательно)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Введите комментарий или дополнительную информацию об оценке" 
                      className="resize-none h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Комментарий будет виден ученику
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="gap-1"
              >
                <X className="h-4 w-4" />
                Отмена
              </Button>
              <Button type="submit" className="gap-1">
                <Save className="h-4 w-4" />
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>
  );
};

export default GradeStudentForm;
