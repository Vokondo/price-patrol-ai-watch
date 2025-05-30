
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, DollarSign, TrendingUp, Clock } from "lucide-react";

export function MetricsCards() {
  const metrics = [
    {
      title: "Active Violations",
      value: "23",
      change: "+12%",
      changeType: "increase" as const,
      icon: AlertTriangle,
      description: "MAP violations detected today"
    },
    {
      title: "Monitored Products",
      value: "1,247",
      change: "+5.2%",
      changeType: "increase" as const,
      icon: DollarSign,
      description: "Across all retailers"
    },
    {
      title: "Compliance Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "increase" as const,
      icon: TrendingUp,
      description: "7-day average"
    },
    {
      title: "Last Scrape",
      value: "12m ago",
      change: "On schedule",
      changeType: "neutral" as const,
      icon: Clock,
      description: "Next in 3h 48m"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={
                metric.changeType === "increase" ? "text-green-600" :
                metric.changeType === "neutral" ? "text-muted-foreground" :
                "text-red-600"
              }>
                {metric.change}
              </span>
              {" "}{metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
