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
  Shield,
  Activity
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
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-sidebar-border bg-sidebar hidden md:flex" collapsible="icon">
          <SidebarContent>
            <div className="p-6 border-b border-sidebar-border group-data-[collapsible=icon]:p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-sidebar-primary-foreground" />
                </div>
                <div className="group-data-[collapsible=icon]:hidden">
                  <h2 className="text-xl font-bold text-sidebar-foreground">STONZ</h2>
                  <p className="text-sm text-sidebar-foreground/70">Price Compliance</p>
                </div>
              </div>
            </div>
            
            <SidebarGroup className="px-4 py-6 group-data-[collapsible=icon]:px-2">
              <SidebarGroupLabel className="text-sidebar-foreground/50 font-medium mb-4 group-data-[collapsible=icon]:sr-only">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.url)}
                        tooltip={item.title}
                      >
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) => 
                            `flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive 
                                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                                : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                            } group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2`
                          }
                        >
                          <item.icon className="h-5 w-5 icon-line" />
                          <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col w-full">
          <header className="h-16 md:h-18 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 md:px-8 shadow-sm">
            <SidebarTrigger className="hover:bg-accent rounded-lg p-2 md:hidden" />
            <div className="flex md:hidden items-center space-x-3 ml-4">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-sidebar-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">STONZ</h2>
              </div>
            </div>
            <div className="hidden md:block">
              <SidebarTrigger className="hover:bg-accent rounded-lg p-2" />
            </div>
            <div className="ml-auto flex items-center space-x-4 md:space-x-6">
              <div className="flex items-center space-x-2 md:space-x-3 text-sm">
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Activity className="w-3 h-3 md:w-4 md:h-4 text-success animate-pulse" />
                  <span className="text-muted-foreground font-medium text-xs md:text-sm">System Online</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
