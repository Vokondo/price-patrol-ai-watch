
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, ShieldAlert, Clock, DollarSign, Eye, Play } from "lucide-react";
import { ViolationTable } from "@/components/ViolationTable";
import { MetricsCards } from "@/components/MetricsCards";
import { ViolationChart } from "@/components/ViolationChart";

const Dashboard = () => {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 lg:space-y-6 xl:flex-row xl:items-start xl:justify-between xl:space-y-0">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">MAP Monitoring Dashboard</h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl">
            Monitor pricing violations across 50+ retailers in real-time with advanced analytics and automated compliance tracking
          </p>
        </div>
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
          <Button variant="outline" size="default" className="rounded-xl border-2">
            <Eye className="h-4 w-4 mr-2" />
            View All Violations
          </Button>
          <Button size="default" className="rounded-xl bg-success hover:bg-success/90">
            <Play className="h-4 w-4 mr-2" />
            Start Scout
          </Button>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">Key Metrics</h2>
        <MetricsCards />
      </div>

      {/* Charts and Activity Section */}
      <div className="grid gap-6 lg:gap-8 xl:grid-cols-2">
        {/* Violation Trends Chart */}
        <Card className="data-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Violation Trends</span>
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-muted-foreground">
              MAP violations detected over the last 30 days with trend analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ViolationChart />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="data-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg md:text-xl font-semibold flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Scouting Activity</span>
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-muted-foreground">
              Latest monitoring tasks and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { retailer: "Amazon", products: 145, status: "completed", time: "2 hours ago", color: "success" },
                { retailer: "Best Buy", products: 89, status: "running", time: "15 minutes ago", color: "warning" },
                { retailer: "Walmart", products: 203, status: "completed", time: "4 hours ago", color: "success" },
                { retailer: "Target", products: 67, status: "pending", time: "Scheduled", color: "muted" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 md:p-4 border border-border rounded-xl bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      activity.color === 'success' ? 'bg-success' :
                      activity.color === 'warning' ? 'bg-warning animate-pulse' :
                      'bg-muted-foreground/30'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm md:text-base">{activity.retailer}</p>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{activity.products} products monitored</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <Badge 
                      variant={
                        activity.status === "completed" ? "default" :
                        activity.status === "running" ? "secondary" : "outline"
                      }
                      className={`rounded-lg font-medium text-xs ${
                        activity.status === "completed" ? "status-badge-success" :
                        activity.status === "running" ? "status-badge-warning" : ""
                      }`}
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1 font-medium">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Violations Section */}
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">Recent Violations</h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Latest MAP policy violations detected across monitored retailers
            </p>
          </div>
          <Button variant="outline" className="rounded-xl w-full sm:w-auto">
            <AlertTriangle className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
        <Card className="data-card">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <ViolationTable showRecent={true} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
