"use client";

// import { useState, useEffect } from "react"; // 🔧 REMOVE: Unused imports
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  X, 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Code,
  TrendingUp,
  // AlertTriangle // 🔧 REMOVE: Unused import
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export function Sidebar({ isOpen, onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      title: "Tổng quan",
      icon: Home,
      href: "/dashboard",
      color: "text-blue-500"
    },
    {
      title: "Sản phẩm",
      icon: Package,
      href: "/dashboard/products",
      color: "text-green-500",
      children: [
        { title: "Tất cả sản phẩm", href: "/dashboard/products" },
        { title: "Danh mục", href: "/products/categories" },
        { title: "Thêm sản phẩm", href: "/products/create" },
        { title: "Tồn kho", href: "/products/inventory" }
      ]
    },
    {
      title: "Đơn hàng",
      icon: ShoppingCart,
      href: "/orders",
      color: "text-orange-500",
      children: [
        { title: "Tất cả đơn hàng", href: "/orders" },
        { title: "Tạo đơn hàng", href: "/orders/create" }
      ]
    },
    {
      title: "Khách hàng",
      icon: Users,
      href: "/customers",
      color: "text-purple-500"
    },
    {
      title: "Báo cáo",
      icon: BarChart3,
      href: "/reports",
      color: "text-indigo-500"
    },
    {
      title: "Cài đặt",
      icon: Settings,
      href: "/settings",
      color: "text-gray-500"
    }
  ];

  return (
    <>
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out",
        isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
        !isMobile && "lg:translate-x-0"
      )}>
        
        {/* Header Section - Company Branding */}
        <div className="flex flex-col p-4 border-b border-border bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          
          {/* Top Row: Company Logo + Close Button */}
          <div className="flex items-center justify-between mb-3">
            
            {/* 🔧 CHANGE: Company Logo & Name → GiaKiemSo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" /> {/* 🔧 CHANGE: Store → Code icon */}
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-foreground leading-none">
                  GiaKiemSo
                </h1>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">
                  Hệ thống Quản lý {/* 🔧 CHANGE: Management System → Hệ thống Quản lý */}
                </p>
              </div>
            </div>
            
            {/* Close Button - Mobile Only */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Business Stats - Mini Dashboard */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2 text-center">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                Doanh thu
              </div>
              <div className="text-sm font-bold text-foreground">0đ</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2 text-center">
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                <ShoppingCart className="w-3 h-3 inline mr-1" />
                Đơn hàng
              </div>
              <div className="text-sm font-bold text-foreground">0</div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        {/* 🔧 FIX: Replace ScrollArea with native scrolling */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-3 space-y-1">
            
            {/* System Status - Activity Indicator */}
            <div className="mb-4 p-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Hệ thống GiaKiemSo đang hoạt động</span>
              </div>
            </div>

            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <div key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10 px-3",
                      pathname === item.href && "bg-primary/10 text-primary font-medium"
                    )}
                    onClick={isMobile ? onClose : undefined}
                  >
                    <item.icon className={cn("h-4 w-4", item.color)} />
                    <span className="text-sm">{item.title}</span>
                  </Button>
                </Link>
                
                {/* Sub-menu items */}
                {item.children && pathname.startsWith(item.href) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-full justify-start text-xs h-8 px-2",
                            pathname === child.href && "bg-primary/5 text-primary"
                          )}
                          onClick={isMobile ? onClose : undefined}
                        >
                          {child.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-3 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">
              GiaKiemSo v1.0.0 {/* 🔧 CHANGE: Add company name to version */}
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> {/* 🔧 CHANGE: green → emerald */}
              <span>Đang hoạt động</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}