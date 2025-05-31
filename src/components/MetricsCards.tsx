
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
      description: "MAP violations detected today",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50",
      darkBgGradient: "from-red-900/20 to-pink-900/20"
    },
    {
      title: "Monitored Products",
      value: "1,247",
      change: "+5.2%",
      changeType: "increase" as const,
      icon: DollarSign,
      description: "Across all retailers",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20"
    },
    {
      title: "Compliance Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "increase" as const,
      icon: TrendingUp,
      description: "7-day average",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      darkBgGradient: "from-blue-900/20 to-indigo-900/20"
    },
    {
      title: "Last Scrape",
      value: "12m ago",
      change: "On schedule",
      changeType: "neutral" as const,
      icon: Clock,
      description: "Next in 3h 48m",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
      darkBgGradient: "from-purple-900/20 to-violet-900/20"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card 
          key={index} 
          className={`group relative overflow-hidden border-0 shadow-xl bg-gradient-to-br ${metric.bgGradient} dark:${metric.darkBgGradient} hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <metric.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 group-hover:scale-105 transition-transform duration-300">
              {metric.value}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              <span className={`font-medium ${
                metric.changeType === "increase" ? "text-emerald-600 dark:text-emerald-400" :
                metric.changeType === "neutral" ? "text-slate-500" :
                "text-red-600 dark:text-red-400"
              }`}>
                {metric.change}
              </span>
              {" "}<span className="text-slate-500 dark:text-slate-400">{metric.description}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
