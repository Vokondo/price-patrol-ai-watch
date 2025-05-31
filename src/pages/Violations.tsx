
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { ViolationTable } from "@/components/ViolationTable";

const Violations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [retailerFilter, setRetailerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const quickStats = [
    {
      title: "Critical Violations",
      value: "23",
      change: "+12%",
      changeType: "increase" as const,
      icon: AlertTriangle,
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50",
      darkBgGradient: "from-red-950/20 to-rose-950/20"
    },
    {
      title: "Resolution Rate",
      value: "78%",
      change: "+5.2%",
      changeType: "increase" as const,
      icon: TrendingUp,
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      darkBgGradient: "from-emerald-950/20 to-green-950/20"
    },
    {
      title: "Avg Response Time",
      value: "2.3 days",
      change: "-0.5 days",
      changeType: "decrease" as const,
      icon: Clock,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      darkBgGradient: "from-blue-950/20 to-indigo-950/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              MAP Violations
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Manage and track pricing policy violations across all monitored retailers with real-time insights
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <Download className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Export
            </Button>
            <Button size="sm" className="group bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <AlertTriangle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Contact Retailers
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {quickStats.map((stat, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${stat.bgGradient} dark:${stat.darkBgGradient} hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <span className={`font-medium ${
                    stat.changeType === "increase" ? "text-emerald-600 dark:text-emerald-400" :
                    stat.changeType === "decrease" ? "text-blue-600 dark:text-blue-400" :
                    "text-slate-500"
                  }`}>
                    {stat.change}
                  </span>
                  {" "}from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
              Filter Violations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative group">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                  />
                </div>
              </div>
              <Select value={retailerFilter} onValueChange={setRetailerFilter}>
                <SelectTrigger className="md:w-48 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                  <SelectValue placeholder="All Retailers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Retailers</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="bestbuy">Best Buy</SelectItem>
                  <SelectItem value="walmart">Walmart</SelectItem>
                  <SelectItem value="target">Target</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="md:w-48 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="group border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                <Filter className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Violations Table */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">All Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <ViolationTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Violations;
