
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MAP Monitoring Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor pricing violations across 50+ retailers in real-time
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View All Violations
          </Button>
          <Button size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Start Scrape
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <MetricsCards />

      {/* Charts and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Violation Trends</CardTitle>
            <CardDescription>
              MAP violations detected over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ViolationChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Scraping Activity</CardTitle>
            <CardDescription>
              Latest monitoring tasks and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { retailer: "Amazon", products: 145, status: "completed", time: "2 hours ago" },
                { retailer: "Best Buy", products: 89, status: "running", time: "15 minutes ago" },
                { retailer: "Walmart", products: 203, status: "completed", time: "4 hours ago" },
                { retailer: "Target", products: 67, status: "pending", time: "Scheduled" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-medium">{activity.retailer}</p>
                      <p className="text-sm text-muted-foreground">{activity.products} products</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      activity.status === "completed" ? "default" :
                      activity.status === "running" ? "secondary" : "outline"
                    }>
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
          <CardTitle>Recent Violations</CardTitle>
          <CardDescription>
            Latest MAP policy violations detected across monitored retailers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ViolationTable showRecent={true} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
