
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Classes from "@/pages/Classes";
import Students from "@/pages/Students";
import Grades from "@/pages/Grades";
import Schedule from "@/pages/Schedule";
import Calendar from "@/pages/Calendar";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";
import Attendance from "@/pages/Attendance";
import Messages from "@/pages/Messages";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import { useAuth } from "@/hooks/use-auth";
import { SidebarProvider } from "@/components/ui/sidebar";

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <div className="app min-h-screen flex flex-col">
        <Toaster />
        {isAuthenticated ? (
          <SidebarProvider>
            <div className="authenticated-layout flex w-full">
              <Sidebar />
              
              <div className="content-wrapper flex-1 flex flex-col">
                <Header />
                
                <main className="flex-1 app-content p-4">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/grades" element={<Grades />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Navigate to="/dashboard" />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        ) : (
          <div className="guest-layout flex-1 flex flex-col">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
