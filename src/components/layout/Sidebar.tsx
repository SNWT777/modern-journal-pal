
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  LayoutDashboard, 
  Settings, 
  Users,
  LogOut,
  BarChart4,
  FileText,
  MessageSquare,
  Home,
  Clock,
  ChevronRight,
  Bookmark
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const AppSidebar = () => {
  const { user, logout } = useAuth();
  const [expandedGroup, setExpandedGroup] = useState<string | null>("main");

  if (!user) return null;

  // Define navigation items based on user role
  const mainNavItems = getNavItemsByRole(user.role);

  const toggleGroup = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2 transition-all duration-300 hover:scale-105">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
            ШЖ
          </div>
          <span className="font-bold text-sidebar-foreground text-lg tracking-wide">ШКОЛЬНЫЙ ЖУРНАЛ</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup expanded={expandedGroup === "main"} onExpandedChange={() => toggleGroup("main")}>
          <SidebarGroupLabel className="text-xs uppercase font-bold text-sidebar-foreground/60 tracking-wider">
            Основное
            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedGroup === "main" ? "rotate-90" : ""}`} />
          </SidebarGroupLabel>
          <SidebarGroupContent className="animate-slide-up">
            <SidebarMenu>
              {mainNavItems.slice(0, 3).map((item, index) => (
                <SidebarMenuItem key={item.title} className="staggered-item staggered-fade-in">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.path}
                            className={({ isActive }) => 
                              isActive 
                                ? "text-white bg-sidebar-accent" 
                                : "hover:bg-sidebar-accent/30 transition-colors"
                            }
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge.variant} 
                                className="ml-auto scale-90 animate-pulse-light"
                              >
                                {item.badge.content}
                              </Badge>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="animate-fade-in">
                        {item.description || item.title}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup expanded={expandedGroup === "academic"} onExpandedChange={() => toggleGroup("academic")}>
          <SidebarGroupLabel className="text-xs uppercase font-bold text-sidebar-foreground/60 tracking-wider mt-4">
            Учебный процесс
            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedGroup === "academic" ? "rotate-90" : ""}`} />
          </SidebarGroupLabel>
          <SidebarGroupContent className="animate-slide-up">
            <SidebarMenu>
              {mainNavItems.slice(3).map((item, index) => (
                <SidebarMenuItem key={item.title} className="staggered-item staggered-fade-in">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.path}
                            className={({ isActive }) => 
                              isActive 
                                ? "text-white bg-sidebar-accent" 
                                : "hover:bg-sidebar-accent/30 transition-colors"
                            }
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge.variant} 
                                className="ml-auto scale-90 animate-pulse-light"
                              >
                                {item.badge.content}
                              </Badge>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="animate-fade-in">
                        {item.description || item.title}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup expanded={expandedGroup === "favorites"} onExpandedChange={() => toggleGroup("favorites")} className="mt-4">
          <SidebarGroupLabel className="text-xs uppercase font-bold text-sidebar-foreground/60 tracking-wider">
            Избранное
            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedGroup === "favorites" ? "rotate-90" : ""}`} />
          </SidebarGroupLabel>
          <SidebarGroupContent className="animate-slide-up">
            <SidebarMenu>
              <SidebarMenuItem className="staggered-item staggered-fade-in">
                <SidebarMenuButton className="hover:bg-sidebar-accent/30 transition-colors">
                  <Bookmark className="h-5 w-5" />
                  <span>Математика 9A</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="staggered-item staggered-fade-in">
                <SidebarMenuButton className="hover:bg-sidebar-accent/30 transition-colors">
                  <Bookmark className="h-5 w-5" />
                  <span>Календарь экзаменов</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-white bg-sidebar-accent" 
                    : "hover:bg-sidebar-accent/30 transition-colors"
                }
              >
                <Settings className="h-5 w-5" />
                <span>Настройки</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout} className="hover:bg-sidebar-accent/30 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Выйти</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

// Helper function to get navigation items based on user role
const getNavItemsByRole = (role: string) => {
  // Common items for all roles
  const commonItems = [
    {
      title: "Главная",
      icon: LayoutDashboard,
      path: "/",
      description: "Обзор вашей активности и статистики"
    },
    {
      title: "Расписание",
      icon: Calendar,
      path: "/calendar",
      description: "Управление учебным расписанием",
      badge: {
        content: "Новое",
        variant: "default" as const
      }
    }
  ];

  // Role-specific items
  switch (role) {
    case "admin":
      return [
        ...commonItems,
        {
          title: "Ученики",
          icon: Users,
          path: "/students",
          description: "Управление учениками школы"
        },
        {
          title: "Классы",
          icon: BookOpen,
          path: "/classes",
          description: "Управление школьными классами"
        },
        {
          title: "Учителя",
          icon: GraduationCap,
          path: "/teachers",
          description: "Управление педагогическим составом"
        },
        {
          title: "Статистика",
          icon: BarChart4,
          path: "/statistics",
          description: "Аналитика успеваемости и посещаемости"
        }
      ];
    
    case "teacher":
      return [
        ...commonItems,
        {
          title: "Мои классы",
          icon: BookOpen,
          path: "/classes",
          description: "Ваши текущие классы и предметы",
          badge: {
            content: "2",
            variant: "secondary" as const
          }
        },
        {
          title: "Оценки",
          icon: GraduationCap,
          path: "/grades",
          description: "Управление оценками учеников"
        },
        {
          title: "Домашние задания",
          icon: FileText,
          path: "/assignments",
          description: "Назначение и проверка заданий"
        },
        {
          title: "Сообщения",
          icon: MessageSquare,
          path: "/messages",
          description: "Общение с учениками и коллегами",
          badge: {
            content: "3",
            variant: "destructive" as const
          }
        }
      ];
    
    case "student":
    default:
      return [
        ...commonItems,
        {
          title: "Оценки",
          icon: GraduationCap,
          path: "/grades",
          description: "Ваши текущие оценки по предметам"
        },
        {
          title: "Домашние задания",
          icon: FileText,
          path: "/assignments",
          description: "Ваши текущие и прошлые задания",
          badge: {
            content: "4",
            variant: "destructive" as const
          }
        },
        {
          title: "Посещаемость",
          icon: Clock,
          path: "/attendance",
          description: "История ваших посещений занятий"
        },
        {
          title: "Сообщения",
          icon: MessageSquare,
          path: "/messages",
          description: "Общение с учителями и одноклассниками",
          badge: {
            content: "1",
            variant: "secondary" as const
          }
        }
      ];
  }
};

export default AppSidebar;
