
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookOpen, Check, Plus, X } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const classFormSchema = z.object({
  name: z.string().min(2, {
    message: "Название класса должно содержать не менее 2 символов",
  }),
  subject: z.string().min(1, {
    message: "Выберите предмет",
  }),
  color: z.string().min(1, {
    message: "Выберите цвет",
  }),
});

export type ClassFormValues = z.infer<typeof classFormSchema>;

interface CreateClassFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClassCreated?: (data: ClassFormValues) => void;
}

const defaultValues: Partial<ClassFormValues> = {
  color: "bg-edu-blue",
};

const CreateClassForm: React.FC<CreateClassFormProps> = ({ 
  open, 
  onOpenChange,
  onClassCreated 
}) => {
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues,
  });

  function onSubmit(data: ClassFormValues) {
    if (onClassCreated) {
      onClassCreated(data);
    }
    form.reset(defaultValues);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-5 w-5 text-primary" />
            Создание нового класса
          </DialogTitle>
          <DialogDescription>
            Заполните форму для создания нового учебного класса
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название класса</FormLabel>
                  <FormControl>
                    <Input placeholder="Например: Алгебра 9А" {...field} />
                  </FormControl>
                  <FormDescription>
                    Укажите название и номер класса
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Предмет</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите предмет" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Математика">Математика</SelectItem>
                      <SelectItem value="Физика">Физика</SelectItem>
                      <SelectItem value="Химия">Химия</SelectItem>
                      <SelectItem value="Биология">Биология</SelectItem>
                      <SelectItem value="История">История</SelectItem>
                      <SelectItem value="Литература">Литература</SelectItem>
                      <SelectItem value="Русский язык">Русский язык</SelectItem>
                      <SelectItem value="Английский язык">Английский язык</SelectItem>
                      <SelectItem value="Информатика">Информатика</SelectItem>
                      <SelectItem value="Гуманитарные науки">Гуманитарные науки</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цвет</FormLabel>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { value: "bg-edu-blue", label: "Синий" },
                      { value: "bg-edu-green", label: "Зеленый" },
                      { value: "bg-edu-yellow", label: "Желтый" },
                      { value: "bg-edu-red", label: "Красный" },
                      { value: "bg-edu-accent", label: "Фиолетовый" },
                      { value: "bg-edu-lightblue", label: "Голубой" },
                      { value: "bg-gray-500", label: "Серый" },
                      { value: "bg-pink-500", label: "Розовый" },
                      { value: "bg-orange-500", label: "Оранжевый" },
                      { value: "bg-indigo-500", label: "Индиго" },
                    ].map((color) => (
                      <div 
                        key={color.value}
                        className={`relative p-2 rounded-md cursor-pointer transition-all ${
                          field.value === color.value 
                            ? "ring-2 ring-primary ring-offset-2" 
                            : "hover:opacity-80"
                        }`}
                        onClick={() => field.onChange(color.value)}
                      >
                        <div className={`h-8 w-full rounded-md ${color.value}`}>
                          {field.value === color.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
                <Plus className="h-4 w-4" />
                Создать класс
              </Button>
            </DialogFooter>
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassForm;
