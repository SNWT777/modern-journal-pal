
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export type GradeData = {
  id: string;
  student_id: string;
  student_name?: string;
  class_id: string;
  class_name?: string;
  assignment_id?: string;
  assignment_name?: string;
  grade: string;
  comments?: string;
  submitted_at: string;
  graded_at: string;
  graded_by?: string;
  grader_name?: string;
};

export function useGrades() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<GradeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGrades = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: gradesError } = await supabase
        .from('grades')
        .select(`
          *,
          student:student_id(name),
          class:class_id(name),
          assignment:assignment_id(title),
          grader:graded_by(name)
        `)
        .order('graded_at', { ascending: false });

      if (gradesError) throw gradesError;

      const formattedGrades = data.map(grade => ({
        id: grade.id,
        student_id: grade.student_id,
        student_name: grade.student?.name,
        class_id: grade.class_id,
        class_name: grade.class?.name,
        assignment_id: grade.assignment_id,
        assignment_name: grade.assignment?.title,
        grade: grade.grade,
        comments: grade.comments,
        submitted_at: grade.submitted_at,
        graded_at: grade.graded_at,
        graded_by: grade.graded_by,
        grader_name: grade.grader?.name
      }));

      setGrades(formattedGrades);
    } catch (err) {
      console.error("Error fetching grades:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch grades'));
      toast.error("Ошибка при загрузке оценок");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createGrade = async (gradeData: {
    student_id: string;
    class_id: string;
    assignment_id?: string;
    grade: string;
    comments?: string;
  }) => {
    if (!user) {
      toast.error("Необходимо авторизоваться");
      return null;
    }

    try {
      const newGrade = {
        ...gradeData,
        graded_by: user.id
      };

      const { data, error } = await supabase
        .from('grades')
        .insert(newGrade)
        .select()
        .single();

      if (error) throw error;

      toast.success("Оценка успешно выставлена");
      
      // Refresh the grades list
      fetchGrades();
      
      return data;
    } catch (err) {
      console.error("Error creating grade:", err);
      toast.error("Ошибка при выставлении оценки");
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchGrades();
    } else {
      setGrades([]);
    }
  }, [user, fetchGrades]);

  return {
    grades,
    loading,
    error,
    fetchGrades,
    createGrade
  };
}
