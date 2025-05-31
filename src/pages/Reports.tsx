
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar, TrendingUp, AlertTriangle, FileText, DollarSign, Target } from "lucide-react";
import { ViolationChart } from "@/components/ViolationChart";

const Reports = () => {
  const summaryCards = [
    {
      title: "Total Violations",
      value: "342",
      change: "+15% from last period",
      changeType: "increase" as const,
      icon: AlertTriangle,
      gradient: "from-red-500 to-rose-600",
      bgGradient: "from-red-50 to-rose-50",
      darkBgGradient: "from-red-950/20 to-rose-950/20"
    },
    {
      title: "Revenue Impact",
      value: "$128K",
      change: "Estimated lost margin",
      changeType: "neutral" as const,
      icon: DollarSign,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      darkBgGradient: "from-amber-950/20 to-orange-950/20"
    },
    {
      title: "Resolution Rate",
      value: "78%",
      change: "+5% improvement",
      changeType: "increase" as const,
      icon: Target,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      darkBgGradient: "from-emerald-950/20 to-green-950/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Reports & Analytics
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Generate compliance reports and analyze violation trends with advanced insights
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="30">
              <SelectTrigger className="w-32 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <Calendar className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Custom Range
            </Button>
            <Button size="sm" className="group bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Download className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {summaryCards.map((card, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${card.bgGradient} dark:${card.darkBgGradient} hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${card.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:scale-105 transition-transform duration-300">
                  {card.value}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <span className={`font-medium ${
                    card.changeType === "increase" ? "text-emerald-600 dark:text-emerald-400" :
                    "text-slate-500"
                  }`}>
                    {card.change}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Violation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ViolationChart />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Top Violating Retailers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Amazon", violations: 45, change: "+12%" },
                  { name: "eBay", violations: 32, change: "+8%" },
                  { name: "Walmart", violations: 28, change: "-3%" },
                  { name: "Best Buy", violations: 19, change: "+5%" },
                  { name: "Target", violations: 15, change: "-2%" }
                ].map((retailer, index) => (
                  <div key={index} className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-rose-500 group-hover:scale-110 transition-transform"></div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{retailer.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{retailer.violations}</span>
                      <span className={`ml-2 text-xs font-medium ${
                        retailer.change.startsWith('+') ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {retailer.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Report Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Executive Summary",
                  description: "High-level compliance overview for leadership",
                  gradient: "from-slate-600 to-slate-800"
                },
                {
                  title: "Detailed Violations",
                  description: "Complete list with evidence and contact info",
                  gradient: "from-blue-500 to-indigo-600"
                },
                {
                  title: "Retailer Performance",
                  description: "Individual retailer compliance scorecards",
                  gradient: "from-emerald-500 to-green-600"
                }
              ].map((template, index) => (
                <Card key={index} className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {template.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {template.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="outline" className="w-full group/btn border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                      <Download className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
