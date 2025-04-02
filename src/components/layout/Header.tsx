import React, { useState, useEffect } from "react";
import { Bell, Menu, User, Moon, Sun, LogOut, Search, BookOpen, Calendar, Settings } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success(`Тема переключена на ${theme === "dark" ? "светлую" : "темную"}`);
  };

  return (
    <header className={`bg-background border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10 transition-all duration-300 ${scrolled ? 'shadow-md backdrop-blur-sm bg-background/90' : 'shadow-sm'}`}>
      <div className="flex items-center">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="mr-2 transition-all hover:bg-primary/10">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        <div className="flex items-center group">
          <Link to="/" className="transition-all duration-300 hover:opacity-80">
            <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Школьный Журнал
            </h1>
          </Link>
        </div>
      </div>

      <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${searchOpen ? 'w-1/2' : 'w-1/3'}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Поиск..." 
            className="pl-10 pr-4 py-2 w-full bg-secondary/50 focus:bg-secondary border-none focus:ring-2 transition-all duration-300"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
          {searchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-card rounded-md border shadow-lg animate-slide-down">
              <div className="text-xs text-muted-foreground mb-2">Быстрый доступ</div>
              <div className="flex flex-col space-y-1">
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <Link to="/classes">
                    <BookOpen className="h-3.5 w-3.5 mr-2" />
                    <span>Математика 9А</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="justify-start" asChild>
                  <Link to="/calendar">
                    <Calendar className="h-3.5 w-3.5 mr-2" />
                    <span>Расписание на сегодня</span>
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="transition-all hover:bg-primary/10 text-foreground">
          {theme === "dark" ? <Sun className="h-5 w-5 animate-scale-in" /> : <Moon className="h-5 w-5 animate-scale-in" />}
        </Button>
        
        <NotificationsDropdown />
        
        <UserDropdown />
      </div>
    </header>
  );
};

const NotificationsDropdown = () => {
  const notifications = [
    { id: 1, title: "Новая оценка", message: "Вы получили оценку 5 по математике", read: false, time: "10 мин назад" },
    { id: 2, title: "Новое задание", message: "Добавлено домашнее задание по физике", read: false, time: "1 час назад" },
    { id: 3, title: "Уведомление от учителя", message: "Завтра контрольная работа", read: true, time: "Вчера" },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    toast.success("Все уведомления прочитаны");
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative transition-all hover:bg-primary/10 text-foreground">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-accent text-xs flex items-center justify-center text-white animate-bounce">{unreadCount}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Уведомления</span>
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-0 text-xs text-primary transition-colors hover:text-primary/80">
            Отметить все как прочитанные
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">Нет уведомлений</div>
        ) : (
          <div className="max-h-[300px] overflow-auto">
            {notifications.map((notification, index) => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer p-3 flex flex-col items-start hover:bg-secondary/50 transition-colors duration-200 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">{notification.title}</span>
                  {!notification.read && <Badge variant="secondary" className="scale-75">Новое</Badge>}
                </div>
                <span className="text-sm text-muted-foreground mt-1">{notification.message}</span>
                <span className="text-xs text-muted-foreground mt-2">{notification.time}</span>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center text-primary hover:text-primary/80 transition-colors">
          Все уведомления
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserDropdown = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('');
  
  let roleDisplay = "Ученик";
  if (user.role === "admin") {
    roleDisplay = "Администратор";
  } else if (user.role === "teacher") {
    roleDisplay = "Учитель";
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar_url || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <span>{user.name}</span>
            <span className="text-xs text-muted-foreground">{roleDisplay}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50 transition-colors duration-200">
          <User className="mr-2 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50 transition-colors duration-200">
          <Link to="/settings" className="flex items-center w-full">
            <Settings className="mr-2 h-4 w-4" />
            Настройки
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-accent hover:bg-accent/10 transition-colors duration-200">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
