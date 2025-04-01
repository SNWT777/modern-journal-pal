
import React from "react";
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
  Clock
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

const AppSidebar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Define navigation items based on user role
  const mainNavItems = getNavItemsByRole(user.role);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs">
            ШЖ
          </div>
          <span className="font-bold text-sidebar-foreground">ШКОЛЬНЫЙ ЖУРНАЛ</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
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
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
      path: "/"
    },
    {
      title: "Расписание",
      icon: Calendar,
      path: "/calendar"
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
          path: "/students"
        },
        {
          title: "Классы",
          icon: BookOpen,
          path: "/classes"
        },
        {
          title: "Учителя",
          icon: GraduationCap,
          path: "/teachers"
        },
        {
          title: "Статистика",
          icon: BarChart4,
          path: "/statistics"
        }
      ];
    
    case "teacher":
      return [
        ...commonItems,
        {
          title: "Мои классы",
          icon: BookOpen,
          path: "/classes"
        },
        {
          title: "Оценки",
          icon: GraduationCap,
          path: "/grades"
        },
        {
          title: "Домашние задания",
          icon: FileText,
          path: "/assignments"
        },
        {
          title: "Сообщения",
          icon: MessageSquare,
          path: "/messages"
        }
      ];
    
    case "student":
    default:
      return [
        ...commonItems,
        {
          title: "Оценки",
          icon: GraduationCap,
          path: "/grades"
        },
        {
          title: "Домашние задания",
          icon: FileText,
          path: "/assignments"
        },
        {
          title: "Посещаемость",
          icon: Clock,
          path: "/attendance"
        },
        {
          title: "Сообщения",
          icon: MessageSquare,
          path: "/messages"
        }
      ];
  }
};

export default AppSidebar;
