
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
        <Sidebar className="border-r border-sidebar-border bg-sidebar">
          <SidebarContent>
            <div className="p-6 border-b border-sidebar-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sidebar-primary rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-sidebar-foreground">STONZ</h2>
                  <p className="text-sm text-sidebar-foreground/70">Price Compliance</p>
                </div>
              </div>
            </div>
            
            <SidebarGroup className="px-4 py-6">
              <SidebarGroupLabel className="text-sidebar-foreground/50 font-medium mb-4">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) => 
                            `flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive 
                                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                                : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                            }`
                          }
                        >
                          <item.icon className="h-5 w-5 icon-line" />
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
          <header className="h-18 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-8 shadow-sm">
            <SidebarTrigger className="hover:bg-accent rounded-lg p-2" />
            <div className="ml-auto flex items-center space-x-6">
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-success animate-pulse" />
                  <span className="text-muted-foreground font-medium">System Online</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 bg-background">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
