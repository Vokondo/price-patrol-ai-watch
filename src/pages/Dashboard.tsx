
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, ShieldAlert, Clock, DollarSign, Eye, Sparkles, Zap } from "lucide-react";
import { ViolationTable } from "@/components/ViolationTable";
import { MetricsCards } from "@/components/MetricsCards";
import { ViolationChart } from "@/components/ViolationChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="space-y-6 p-6">
        {/* Header with sophisticated gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>
          
          <div className="relative flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">MAP Monitoring Dashboard</h1>
              </div>
              <p className="text-lg text-blue-100 max-w-2xl">
                Monitor pricing violations across 50+ retailers in real-time with advanced analytics
              </p>
            </div>
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="group bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Eye className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                View All Violations
              </Button>
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Zap className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Scrape
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Metrics */}
        <div className="transform transition-all duration-500 hover:scale-[1.01]">
          <MetricsCards />
        </div>

        {/* Charts and Recent Activity with enhanced styling */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-xl flex items-center space-x-2">
                <TrendingUp className="h-6 w-6" />
                <span>Violation Trends</span>
              </CardTitle>
              <CardDescription className="text-blue-100">
                MAP violations detected over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ViolationChart />
            </CardContent>
          </Card>

          <Card className="group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CardTitle className="text-xl flex items-center space-x-2">
                <Clock className="h-6 w-6" />
                <span>Recent Scraping Activity</span>
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Latest monitoring tasks and their status
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { retailer: "Amazon", products: 145, status: "completed", time: "2 hours ago", color: "bg-green-500" },
                  { retailer: "Best Buy", products: 89, status: "running", time: "15 minutes ago", color: "bg-blue-500" },
                  { retailer: "Walmart", products: 203, status: "completed", time: "4 hours ago", color: "bg-green-500" },
                  { retailer: "Target", products: 67, status: "pending", time: "Scheduled", color: "bg-yellow-500" }
                ].map((activity, index) => (
                  <div 
                    key={index} 
                    className="group flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${activity.color} animate-pulse shadow-lg`}></div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                          {activity.retailer}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {activity.products} products
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          activity.status === "completed" ? "default" :
                          activity.status === "running" ? "secondary" : "outline"
                        }
                        className={`text-xs font-medium ${
                          activity.status === "completed" ? "bg-green-100 text-green-800 border-green-200" :
                          activity.status === "running" ? "bg-blue-100 text-blue-800 border-blue-200" :
                          "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }`}
                      >
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Recent Violations */}
        <Card className="group overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-3xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white">
            <CardTitle className="text-xl flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6" />
              <span>Recent Violations</span>
            </CardTitle>
            <CardDescription className="text-red-100">
              Latest MAP policy violations detected across monitored retailers
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <ViolationTable showRecent={true} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
