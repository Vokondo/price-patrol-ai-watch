
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
  Activity,
  Menu
} from "lucide-react";

const navigationItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Violations", url: "/violations", icon: AlertTriangle },
  { title: "Products", url: "/products", icon: Package },
  { title: "Retailers", url: "/retailers", icon: Store },
  { title: "Reports", url: "/reports", icon: FileText },
];

const generalItems = [
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
            <div className="p-6 border-b border-sidebar-border/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-sidebar-foreground">Siohioma</h2>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-6">
              <div className="space-y-6">
                <SidebarGroup>
                  <SidebarGroupLabel className="text-sidebar-foreground/50 font-medium mb-3 text-xs uppercase tracking-wider">Menu</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-1">
                      {navigationItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink 
                              to={item.url} 
                              className={({ isActive }) => 
                                `sidebar-nav-item ${isActive ? 'sidebar-nav-item-active' : ''}`
                              }
                            >
                              <item.icon className="h-5 w-5" />
                              <span className="font-medium">{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel className="text-sidebar-foreground/50 font-medium mb-3 text-xs uppercase tracking-wider">General</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-1">
                      {generalItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink 
                              to={item.url} 
                              className={({ isActive }) => 
                                `sidebar-nav-item ${isActive ? 'sidebar-nav-item-active' : ''}`
                              }
                            >
                              <item.icon className="h-5 w-5" />
                              <span className="font-medium">{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-background flex items-center justify-between px-8">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="hover:bg-accent rounded-lg p-2">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Sales Admin</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search anything in Siohioma..."
                  className="search-input w-80"
                />
              </div>
              <button className="btn-primary">
                Add new product
              </button>
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
