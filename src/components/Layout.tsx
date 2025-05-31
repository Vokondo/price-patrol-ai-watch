
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Package, 
  Store, 
  FileText, 
  Settings, 
  User,
  Shield
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Violations", url: "/violations", icon: AlertTriangle },
  { title: "Products", url: "/products", icon: Package },
  { title: "Retailers", url: "/retailers", icon: Store },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Account", url: "/account", icon: User },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl">
          <SidebarContent>
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-900 via-black to-gray-900 dark:from-gray-100 dark:via-white dark:to-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-black/20">
                  <Shield className="h-6 w-6 text-white dark:text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-white dark:from-black dark:via-gray-900 dark:to-black bg-clip-text text-transparent">
                    STONZ
                  </h2>
                  <p className="text-xs text-white/70 dark:text-black/70 font-medium">
                    Price Compliance
                  </p>
                </div>
              </div>
            </div>
            
            <SidebarGroup className="p-4">
              <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 font-semibold text-xs uppercase tracking-wider mb-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) => 
                            `group flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive 
                                ? 'bg-gradient-to-r from-gray-900 via-black to-gray-900 dark:from-gray-100 dark:via-white dark:to-gray-100 text-white dark:text-black shadow-lg transform scale-105' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 hover:shadow-md'
                            }`
                          }
                        >
                          <div className={`p-2 rounded-lg transition-all duration-300 ${
                            isActive(item.url)
                              ? 'bg-white/20 dark:bg-black/20'
                              : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600'
                          }`}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 flex items-center px-6 shadow-sm">
            <SidebarTrigger className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors p-2 rounded-lg" />
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-800">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">System Online</span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
