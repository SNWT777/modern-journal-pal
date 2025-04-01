
import React from "react";
import { Bell, Menu, User, Moon, Sun, LogOut } from "lucide-react";
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

const Header = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success(`Тема переключена на ${theme === "dark" ? "светлую" : "темную"}`);
  };

  return (
    <header className="bg-background border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        <div className="flex items-center">
          <Link to="/">
            <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Школьный Журнал
            </h1>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <NotificationsDropdown />
        
        <UserDropdown />
      </div>
    </header>
  );
};

const NotificationsDropdown = () => {
  const notifications = [
    { id: 1, title: "Новая оценка", message: "Вы получили оценку 5 по математике", read: false },
    { id: 2, title: "Новое задание", message: "Добавлено домашнее задание по физике", read: false },
    { id: 3, title: "Уведомление от учителя", message: "Завтра контрольная работа", read: true },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    toast.success("Все уведомления прочитаны");
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-accent text-xs flex items-center justify-center text-white">{unreadCount}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between">
          <span>Уведомления</span>
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-0 text-xs text-primary">
            Отметить все как прочитанные
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">Нет уведомлений</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="cursor-pointer p-3 flex flex-col items-start">
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{notification.title}</span>
                {!notification.read && <span className="h-2 w-2 rounded-full bg-accent"></span>}
              </div>
              <span className="text-sm text-muted-foreground">{notification.message}</span>
            </DropdownMenuItem>
          ))
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center text-primary">
          Все уведомления
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserDropdown = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  // Generate initials from name
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('');
  
  // Get role display name
  let roleDisplay = "Ученик";
  if (user.role === "admin") {
    roleDisplay = "Администратор";
  } else if (user.role === "teacher") {
    roleDisplay = "Учитель";
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={user.avatar || ""} />
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
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link to="/settings" className="flex items-center w-full">
            Настройки
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-accent">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
