
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

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

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import { useAuth } from "@/hooks/use-auth";

function App() {
  const { user, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="app min-h-screen flex flex-col">
        <Toaster richColors />
        {isAuthenticated ? (
          <div className="authenticated-layout flex">
            <Sidebar />
            
            <div className="content-wrapper flex-1 flex flex-col">
              <Header />
              
              <main className="flex-1 app-content">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/grades" element={<Grades />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/login" element={<Navigate to="/dashboard" />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          <div className="guest-layout flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Navigate to="/login" />} />
              <Route path="/classes" element={<Navigate to="/login" />} />
              <Route path="/students" element={<Navigate to="/login" />} />
              <Route path="/grades" element={<Navigate to="/login" />} />
              <Route path="/schedule" element={<Navigate to="/login" />} />
              <Route path="/calendar" element={<Navigate to="/login" />} />
              <Route path="/settings" element={<Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
