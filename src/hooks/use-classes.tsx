
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export type ClassData = {
  id: string;
  name: string;
  subject: string;
  teacher_id: string;
  teacher_name?: string;
  color: string;
  student_count?: number;
  created_at: string;
  updated_at: string;
};

export function useClasses() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchClasses = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Query classes table
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select(`
          *,
          teacher:profiles!teacher_id(name)
        `)
        .order('created_at', { ascending: false });

      if (classesError) throw classesError;

      // Get student counts for each class
      const classesWithStudentCount = await Promise.all(
        classesData.map(async (classItem) => {
          const { count, error: countError } = await supabase
            .from('class_students')
            .select('*', { count: 'exact', head: true })
            .eq('class_id', classItem.id);

          if (countError) {
            console.error('Error fetching student count:', countError);
            return {
              ...classItem,
              teacher_name: classItem.teacher?.name || "Преподаватель",
              student_count: 0
            };
          }

          return {
            ...classItem,
            teacher_name: classItem.teacher?.name || "Преподаватель",
            student_count: count || 0
          };
        })
      );

      setClasses(classesWithStudentCount as ClassData[]);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch classes'));
      toast.error("Ошибка при загрузке классов");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createClass = async (classData: Omit<ClassData, 'id' | 'created_at' | 'updated_at' | 'teacher_id' | 'student_count'>) => {
    if (!user) {
      toast.error("Необходимо авторизоваться");
      return null;
    }

    try {
      const newClass = {
        ...classData,
        teacher_id: user.id
      };

      const { data, error } = await supabase
        .from('classes')
        .insert(newClass)
        .select('*')
        .single();

      if (error) throw error;

      toast.success("Класс успешно создан");
      
      // Refresh the classes list
      fetchClasses();
      
      return data;
    } catch (err) {
      console.error("Error creating class:", err);
      toast.error("Ошибка при создании класса");
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchClasses();
    } else {
      setClasses([]);
    }
  }, [user, fetchClasses]);

  return {
    classes,
    loading,
    error,
    fetchClasses,
    createClass
  };
}
