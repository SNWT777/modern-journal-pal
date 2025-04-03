import React, { useState, useEffect } from "react";
import { Bell, Menu, User, Moon, Sun, LogOut, Search, BookOpen, Calendar, Settings, X } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <header className={cn(
      "bg-background border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10 transition-all duration-300",
      scrolled ? "shadow-md backdrop-blur-sm bg-background/90" : "shadow-sm"
    )}>
      <div className="flex items-center">
        <SidebarTrigger>
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 transition-all hover:bg-primary/10 rounded-full"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Открыть меню</span>
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

      <div className={cn(
        "absolute left-1/2 transform -translate-x-1/2 transition-all duration-300",
        searchOpen ? "w-1/2" : "w-1/3"
      )}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Поиск..." 
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-10 pr-10 py-2 w-full bg-secondary/50 focus:bg-secondary border-none focus:ring-2 ring-primary/30 transition-all duration-300 rounded-full"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => {
              // Delay closing to allow clicking search results
              setTimeout(() => {
                if (document.activeElement !== document.querySelector("input[type='text']")) {
                  setSearchOpen(false);
                }
              }, 150);
            }}
          />
          {searchValue && (
            <button 
              onClick={clearSearch} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Очистить поиск</span>
            </button>
          )}
          <AnimatePresence>
            {searchOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-1 p-2 bg-card rounded-md border shadow-lg"
              >
                <div className="text-xs text-muted-foreground mb-2">Быстрый доступ</div>
                <div className="flex flex-col space-y-1">
                  <Button variant="ghost" size="sm" className="justify-start hover:bg-secondary transition-all duration-200" asChild>
                    <Link to="/classes">
                      <BookOpen className="h-3.5 w-3.5 mr-2" />
                      <span>Математика 9А</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start hover:bg-secondary transition-all duration-200" asChild>
                    <Link to="/calendar">
                      <Calendar className="h-3.5 w-3.5 mr-2" />
                      <span>Расписание на сегодня</span>
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          className="transition-all hover:bg-primary/10 text-foreground rounded-full"
          aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 30 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </Button>
        
        <NotificationsDropdown />
        
        <UserDropdown />
      </div>
    </header>
  );
};

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Новая оценка", message: "Вы получили оценку 5 по математике", read: false, time: "10 мин назад", type: "grade" },
    { id: 2, title: "Новое задание", message: "Добавлено домашнее задание по физике", read: false, time: "1 час назад", type: "assignment" },
    { id: 3, title: "Уведомление от учителя", message: "Завтра контрольная работа", read: true, time: "Вчера", type: "message" },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("Все уведомления прочитаны");
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success("Уведомление прочитано");
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "grade":
        return <BookOpen className="h-4 w-4 text-emerald-500" />;
      case "assignment":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "message":
        default:
        return <Bell className="h-4 w-4 text-amber-500" />;
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative transition-all hover:bg-primary/10 text-foreground rounded-full"
          aria-label="Уведомления"
        >
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-0 right-0 h-4 w-4 rounded-full bg-accent text-xs flex items-center justify-center text-white"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Уведомления</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead} 
              className="h-auto p-0 text-xs text-primary transition-colors hover:text-primary/80"
            >
              Отметить все как прочитанные
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground flex flex-col items-center">
            <Bell className="h-8 w-8 mb-2 text-muted-foreground/50" />
            <p>Нет уведомлений</p>
          </div>
        ) : (
          <div className="max-h-[300px] overflow-auto">
            {notifications.map((notification, index) => (
              <DropdownMenuItem 
                key={notification.id} 
                className={cn(
                  "cursor-pointer p-3 flex flex-col items-start transition-colors duration-200",
                  !notification.read ? "bg-secondary/40" : "hover:bg-secondary/30"
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {getNotificationIcon(notification.type)}
                    <span className="font-medium">{notification.title}</span>
                  </div>
                  {!notification.read && (
                    <Badge 
                      variant="secondary" 
                      className="scale-75 bg-primary/20 text-primary hover:bg-primary/30"
                    >
                      Новое
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground mt-1 pl-6">{notification.message}</span>
                <span className="text-xs text-muted-foreground mt-2 pl-6">{notification.time}</span>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer justify-center text-primary hover:text-primary/80 transition-colors"
          asChild
        >
          <Link to="/notifications">Все уведомления</Link>
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
  let roleColor = "bg-blue-500/20 text-blue-600";
  
  if (user.role === "admin") {
    roleDisplay = "Администратор";
    roleColor = "bg-red-500/20 text-red-600";
  } else if (user.role === "teacher") {
    roleDisplay = "Учитель";
    roleColor = "bg-green-500/20 text-green-600";
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background"
          aria-label="Профиль пользователя"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar_url || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex flex-col p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={user.avatar_url || ""} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-base">{user.name}</span>
              <span className={cn("text-xs px-2 py-0.5 rounded-full mt-1 inline-block w-fit", roleColor)}>
                {roleDisplay}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer hover:bg-secondary/70 transition-colors duration-200 py-2.5" asChild>
          <Link to="/profile" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Профиль</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-secondary/70 transition-colors duration-200 py-2.5" asChild>
          <Link to="/settings" className="flex items-center w-full">
            <Settings className="mr-2 h-4 w-4" />
            <span>Настройки</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={logout} 
          className="cursor-pointer text-red-500 hover:bg-red-500/10 transition-colors duration-200 py-2.5"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
