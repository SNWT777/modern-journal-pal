
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Home, 
  LayoutDashboard, 
  Settings, 
  Users,
  LogOut,
  BarChart4
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

const mainNavItems = [
  {
    title: "Главная",
    icon: LayoutDashboard,
    path: "/"
  },
  {
    title: "Классы",
    icon: BookOpen,
    path: "/classes"
  },
  {
    title: "Оценки",
    icon: GraduationCap,
    path: "/grades"
  },
  {
    title: "Расписание",
    icon: Calendar,
    path: "/calendar"
  },
  {
    title: "Ученики",
    icon: Users,
    path: "/students"
  },
  {
    title: "Статистика",
    icon: BarChart4,
    path: "/statistics"
  }
];

const AppSidebar = () => {
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
            <SidebarMenuButton asChild>
              <NavLink 
                to="/login"
                className="hover:bg-sidebar-accent/30 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Выйти</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
