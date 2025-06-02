
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { ViolationTable } from "@/components/ViolationTable";
import { ViolationChart } from "@/components/ViolationChart";

const Dashboard = () => {
  const metrics = [
    {
      title: "Net Income",
      value: "$193,000",
      change: "+35%",
      changeType: "positive",
      period: "from last month",
      icon: DollarSign,
      bgColor: "bg-primary"
    },
    {
      title: "Total Return",
      value: "$32,000", 
      change: "-24%",
      changeType: "negative",
      period: "from last month",
      icon: TrendingDown,
      bgColor: "bg-destructive"
    },
    {
      title: "Products Sold",
      value: "1,248",
      change: "+12%",
      changeType: "positive", 
      period: "from last month",
      icon: Package,
      bgColor: "bg-success"
    },
    {
      title: "New Customers",
      value: "892",
      change: "+8%",
      changeType: "positive",
      period: "from last month", 
      icon: Users,
      bgColor: "bg-warning"
    }
  ];

  const transactions = [
    { name: "Premium T-Shirt", date: "Jul 12th 2024", status: "Completed", id: "QJWEJS758NC", icon: "👕" },
    { name: "Playstation 5", date: "Jul 12th 2024", status: "Pending", id: "QJWEJS758NC", icon: "🎮" },
    { name: "Hoodie Gombrong", date: "Jul 12th 2024", status: "Pending", id: "QJWEJS758NC", icon: "👕" },
    { name: "iPhone 15 Pro Max", date: "Jul 12th 2024", status: "Completed", id: "QJWEJS758NC", icon: "📱" },
    { name: "Lotse", date: "Jul 12th 2024", status: "Completed", id: "QJWEJS758NC", icon: "☕" },
  ];

  return (
    <div className="section-spacing">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          An any way to manage sales with care and precision.
        </p>
      </div>

      {/* Update Notice */}
      <Card className="dashboard-card bg-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">12th Jun 2024</h3>
            <p className="text-primary-foreground/90">Sales revenue increased 40% in 1 week</p>
            <button className="mt-2 text-sm underline text-primary-foreground/90 hover:text-primary-foreground">
              See Statistics
            </button>
          </div>
          <TrendingUp className="h-8 w-8 text-primary-foreground/80" />
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid-dashboard">
        {metrics.map((metric, index) => (
          <Card key={index} className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-success' : 'text-destructive'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-muted-foreground">{metric.period}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts and Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Transaction List */}
        <div className="lg:col-span-1">
          <Card className="data-card">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-semibold">Transaction</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">{transaction.icon}</div>
                      <div>
                        <p className="font-medium text-sm">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          transaction.status === "Completed" 
                            ? "status-badge-success" 
                            : "status-badge-pending"
                        }
                      >
                        {transaction.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{transaction.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card className="data-card h-full">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded"></div>
                    <span>Income</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded"></div>
                    <span>Expenses</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">$193,000</span>
                <span className="text-success text-sm font-medium">+36% from last month</span>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <ViolationChart />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Violations Table */}
      <Card className="data-card">
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <Button variant="outline" className="rounded-xl">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ViolationTable showRecent={true} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
