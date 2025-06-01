
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, ShieldAlert, Clock, DollarSign, Eye } from "lucide-react";
import { ViolationTable } from "@/components/ViolationTable";
import { MetricsCards } from "@/components/MetricsCards";
import { ViolationChart } from "@/components/ViolationChart";

const Dashboard = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">MAP Monitoring Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Monitor pricing violations across 50+ retailers in real-time
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Eye className="h-4 w-4 mr-2" />
            View All Violations
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Start Scrape
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <MetricsCards />

      {/* Charts and Recent Activity */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Violation Trends</CardTitle>
            <CardDescription className="text-sm">
              MAP violations detected over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ViolationChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Recent Scraping Activity</CardTitle>
            <CardDescription className="text-sm">
              Latest monitoring tasks and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {[
                { retailer: "Amazon", products: 145, status: "completed", time: "2 hours ago" },
                { retailer: "Best Buy", products: 89, status: "running", time: "15 minutes ago" },
                { retailer: "Walmart", products: 203, status: "completed", time: "4 hours ago" },
                { retailer: "Target", products: 67, status: "pending", time: "Scheduled" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm md:text-base truncate">{activity.retailer}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{activity.products} products</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <Badge 
                      variant={
                        activity.status === "completed" ? "default" :
                        activity.status === "running" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Violations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Recent Violations</CardTitle>
          <CardDescription className="text-sm">
            Latest MAP policy violations detected across monitored retailers
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 md:px-6">
          <ViolationTable showRecent={true} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
