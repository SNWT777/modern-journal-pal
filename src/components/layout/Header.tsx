import React, { useState, useEffect } from "react";
import { 
  Bell, Menu, User, Moon, Sun, LogOut, Search, 
  BookOpen, Calendar, Settings, PenSquare, UserCheck, 
  Mail, Info, School, Clock, MessageSquare
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success(`Тема переключена на ${theme === "dark" ? "светлую" : "темную"}`);
  };

  return (
    <header className={`bg-background/80 border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10 transition-all duration-300 ${scrolled ? "shadow-lg backdrop-blur-lg" : "shadow-sm"}`}>
      <div className="flex items-center">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="mr-2 hover:bg-primary/10 active:scale-95 transition-transform">
            <Menu className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        <Link to="/" className="group flex items-center">
          <School className="h-7 w-7 mr-2 text-primary transition-all group-hover:scale-110" />
          <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            Школьный Журнал
          </h1>
        </Link>
      </div>

      <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${searchOpen ? "w-1/2" : "w-1/3"}`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Поиск..." 
            className="pl-10 pr-4 py-2 w-full bg-secondary/50 focus:bg-secondary border-none focus:ring-2 ring-primary/20 transition-all duration-300 rounded-lg"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <NavAction 
          icon={<Clock className="h-5 w-5" />} 
          href="/attendance" 
          label="Посещаемость" 
          active={location.pathname === "/attendance"}
          badge={2}
        />

        <NavAction 
          icon={<MessageSquare className="h-5 w-5" />} 
          href="/messages" 
          label="Сообщения" 
          active={location.pathname === "/messages"}
          badge={5}
          badgeVariant="destructive"
        />

        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-primary/10 text-foreground">
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <NotificationsDropdown />
        <UserDropdown />
      </div>
    </header>
  );
};

const NavAction = ({ icon, href, label, active, badge, badgeVariant = "default" }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant={active ? "secondary" : "ghost"} size="sm" className="relative">
            <Link to={href} className="flex items-center gap-1.5">
              {icon}
              <span className="hidden md:inline-block">{label}</span>
              {badge && (
                <Badge variant={badgeVariant} className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold">{badge}</span>
                </Badge>
              )}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const NotificationsDropdown = () => {
  const [hasUnread, setHasUnread] = useState(true);
  const notifications = [
    { id: 1, title: "Новые оценки", message: "Выставлены оценки по математике", time: "10 мин назад", read: false },
    { id: 2, title: "Изменение в расписании", message: "Завтра урок физики перенесен", time: "2 часа назад", read: false },
    { id: 3, title: "Домашнее задание", message: "Новое задание по литературе", time: "Вчера", read: true },
  ];

  const markAllAsRead = () => {
    setHasUnread(false);
    toast({
      title: "Уведомления",
      description: "Все уведомления отмечены как прочитанные"
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500">
              <span className="text-[10px] font-bold">3</span>
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Уведомления</span>
          <Button variant="ghost" size="sm" className="h-auto text-xs p-1" onClick={markAllAsRead}>
            Отметить все как прочитанные
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="p-0 focus:bg-secondary cursor-default">
            <div className={`w-full px-2 py-3 ${notification.read ? "" : "bg-primary/5"}`}>
              <div className="flex justify-between items-start">
                <span className="font-medium text-sm">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center cursor-pointer font-medium text-primary">
          <Link to="/notifications">Все уведомления</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Выход из системы",
        description: "Вы успешно вышли из системы"
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Ошибка при выходе из системы",
        variant: "destructive"
      });
    }
  };

  const getInitials = () => {
    if (!user?.name) return "ПП";
    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case "student":
        return "Ученик";
      case "teacher":
        return "Учитель";
      case "admin":
        return "Администратор";
      default:
        return "Пользователь";
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full overflow-hidden h-10 w-10 border border-border">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar_url || ""} />
            <AvatarFallback className="bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex flex-col p-2 gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar_url || ""} />
              <AvatarFallback className="bg-primary/10 text-primary">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user?.name || "Пользователь"}</span>
              <span className="text-xs text-muted-foreground">{getRoleLabel()}</span>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex w-full cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/grades" className="flex w-full cursor-pointer">
              <PenSquare className="mr-2 h-4 w-4" />
              <span>Мои оценки</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/schedule" className="flex w-full cursor-pointer">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Расписание</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex w-full cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Настройки</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Header;
