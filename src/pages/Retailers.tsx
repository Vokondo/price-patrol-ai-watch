
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Settings, Play, Pause, MoreHorizontal, Store, TrendingUp, Clock, Zap } from "lucide-react";

const Retailers = () => {
  const statsCards = [
    {
      title: "Active Retailers",
      value: "47",
      change: "3 paused",
      icon: Store,
      gradient: "from-slate-600 to-slate-800",
      bgGradient: "from-slate-50 to-slate-100",
      darkBgGradient: "from-slate-950/30 to-slate-900/30"
    },
    {
      title: "Success Rate",
      value: "96.2%",
      change: "Last 24 hours",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      darkBgGradient: "from-emerald-950/20 to-green-950/20"
    },
    {
      title: "Total Products",
      value: "1,380",
      change: "Across all retailers",
      icon: Package,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      darkBgGradient: "from-blue-950/20 to-indigo-950/20"
    },
    {
      title: "Avg Response",
      value: "1.4s",
      change: "Network latency",
      icon: Zap,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      darkBgGradient: "from-violet-950/20 to-purple-950/20"
    }
  ];

  const retailers = [
    {
      id: 1,
      name: "Amazon",
      domain: "amazon.com",
      status: "active",
      products: 456,
      lastScrape: "2 hours ago",
      success: 98.2,
      avgResponse: "1.2s"
    },
    {
      id: 2,
      name: "Best Buy",
      domain: "bestbuy.com",
      status: "active",
      products: 234,
      lastScrape: "1 hour ago",
      success: 95.8,
      avgResponse: "0.8s"
    },
    {
      id: 3,
      name: "Walmart",
      domain: "walmart.com",
      status: "paused",
      products: 567,
      lastScrape: "6 hours ago",
      success: 92.1,
      avgResponse: "2.1s"
    },
    {
      id: 4,
      name: "Target",
      domain: "target.com",
      status: "active",
      products: 123,
      lastScrape: "30 minutes ago",
      success: 97.5,
      avgResponse: "1.5s"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Retailer Management
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Configure and monitor scraping settings for each retailer with real-time performance metrics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <Settings className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Global Settings
            </Button>
            <Button size="sm" className="group bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Add Retailer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((card, index) => (
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
                  {card.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Retailers Table */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Retailer Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-slate-200 dark:border-slate-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 dark:border-slate-700">
                    <TableHead className="text-slate-700 dark:text-slate-300">Retailer</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Domain</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Products</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Last Scrape</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Success Rate</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Avg Response</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {retailers.map((retailer) => (
                    <TableRow key={retailer.id} className="group border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100">{retailer.name}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">{retailer.domain}</TableCell>
                      <TableCell>
                        <Badge variant={retailer.status === "active" ? "default" : "secondary"} className={retailer.status === "active" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" : ""}>
                          {retailer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">{retailer.products}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">{retailer.lastScrape}</TableCell>
                      <TableCell>
                        <span className={retailer.success > 95 ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-amber-600 dark:text-amber-400 font-medium"}>
                          {retailer.success}%
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 font-medium">{retailer.avgResponse}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="group/btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            {retailer.status === "active" ? 
                              <Pause className="h-4 w-4 group-hover/btn:scale-110 transition-transform" /> : 
                              <Play className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                            }
                          </Button>
                          <Button variant="ghost" size="sm" className="group/btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <Settings className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </Button>
                          <Button variant="ghost" size="sm" className="group/btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <MoreHorizontal className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Retailers;
