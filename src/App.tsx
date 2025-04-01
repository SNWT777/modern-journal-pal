
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import AppSidebar from "@/components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Grades from "./pages/Grades";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Simple authentication state (would be more robust in production)
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for development

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isAuthenticated ? (
            <SidebarProvider>
              <div className="min-h-screen flex flex-col w-full">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                  <AppSidebar />
                  <main className="flex-1 overflow-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/classes" element={<Classes />} />
                      <Route path="/grades" element={<Grades />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
