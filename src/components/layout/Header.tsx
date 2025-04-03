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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.success(`Тема переключена на ${theme === "dark" ? "светлую" : "темную"}`);
  };

  return (
    <header className={`bg-background border-b border-border h-16 flex items-center justify-between px-4 sticky top-0 z-10 transition-all duration-300 ${scrolled ? "shadow-lg backdrop-blur-lg bg-background/80" : "shadow-sm"}`}>
      <div className="flex items-center">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="mr-2 hover:bg-primary/10 active:scale-95 transition-transform">
            <Menu className="h-6 w-6" />
          </Button>
        </SidebarTrigger>
        <Link to="/" className="group flex items-center">
          <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
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
            className="pl-10 pr-4 py-2 w-full bg-secondary/50 focus:bg-secondary border-none focus:ring-2 transition-all duration-300 rounded-lg"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-primary/10 text-foreground transition-transform active:scale-90 animate-bounce">
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <NotificationsDropdown />
        <UserDropdown />
      </div>
    </header>
  );
};

const NotificationsDropdown = () => {
  return <div>Notifications</div>;
};

const UserDropdown = () => {
  return <div>User</div>;
};

export default Header;
