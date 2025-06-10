"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { MobileHeader } from "./mobile-header";
import { DashboardHeader } from "@/components/dashboard/dashboard-header"; // 🔧 ADD: Import header

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop & Tablet Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Mobile Header */}
      {isMobile && (
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0' : 'lg:ml-64'
      }`}>
        
        {/* 🔧 ADD: Global Header - xuất hiện trên tất cả pages */}
        <DashboardHeader />
        
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}