
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarDays, BookOpen, GraduationCap } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: Date;
  type: "assignment" | "exam" | "meeting";
  class?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Контрольная работа по математике",
    date: new Date(2023, 4, 20),
    type: "exam",
    class: "Математика"
  },
  {
    id: 2,
    title: "Сдача эссе по литературе",
    date: new Date(2023, 4, 25),
    type: "assignment",
    class: "Литература"
  },
  {
    id: 3,
    title: "Родительское собрание",
    date: new Date(2023, 4, 18),
    type: "meeting"
  },
  {
    id: 4,
    title: "Тест по физике",
    date: new Date(2023, 4, 22),
    type: "exam",
    class: "Физика"
  },
  {
    id: 5,
    title: "Презентация проектов",
    date: new Date(2023, 4, 29),
    type: "assignment",
    class: "История"
  }
];

const Calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Filter events for the selected day
  const selectedDayEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Calendar</h1>
        <p className="text-muted-foreground">View and manage your school schedule</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                locale={ru}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">
                  {date ? format(date, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                </h2>
              </div>
              
              {selectedDayEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDayEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg bg-card">
                      <div className="flex items-start">
                        <div className={`
                          p-2 rounded-full mr-3 
                          ${event.type === 'exam' ? 'bg-red-100 text-red-600' : 
                            event.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                            'bg-purple-100 text-purple-600'}
                        `}>
                          {event.type === 'exam' ? (
                            <GraduationCap className="h-5 w-5" />
                          ) : event.type === 'assignment' ? (
                            <BookOpen className="h-5 w-5" />
                          ) : (
                            <CalendarDays className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          {event.class && (
                            <p className="text-sm text-muted-foreground">{event.class}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No events scheduled for this day
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
