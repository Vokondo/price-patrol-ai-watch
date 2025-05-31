
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Search, Edit, Trash2, Package, TrendingUp, DollarSign, Tag } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const statsCards = [
    {
      title: "Total Products",
      value: "1,247",
      change: "+23 this week",
      icon: Package,
      gradient: "from-slate-600 to-slate-800",
      bgGradient: "from-slate-50 to-slate-100",
      darkBgGradient: "from-slate-950/30 to-slate-900/30"
    },
    {
      title: "Monitored",
      value: "1,156",
      change: "92.7% of catalog",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      darkBgGradient: "from-emerald-950/20 to-green-950/20"
    },
    {
      title: "Categories",
      value: "24",
      change: "Across all products",
      icon: Tag,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      darkBgGradient: "from-blue-950/20 to-indigo-950/20"
    },
    {
      title: "Avg MSRP",
      value: "$567",
      change: "Portfolio average",
      icon: DollarSign,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      darkBgGradient: "from-violet-950/20 to-purple-950/20"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra",
      sku: "SM-S928U",
      msrp: 1199.99,
      category: "Smartphones",
      monitored: true,
      retailers: 8,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "Apple iPhone 15 Pro",
      sku: "IPHONE15PRO",
      msrp: 999.99,
      category: "Smartphones",
      monitored: true,
      retailers: 12,
      lastUpdated: "2024-01-15"
    },
    {
      id: 3,
      name: "MacBook Pro 14\"",
      sku: "MBP14-M3",
      msrp: 1999.99,
      category: "Laptops",
      monitored: false,
      retailers: 6,
      lastUpdated: "2024-01-14"
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      sku: "WH1000XM5",
      msrp: 399.99,
      category: "Audio",
      monitored: true,
      retailers: 15,
      lastUpdated: "2024-01-15"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Product Catalog
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Manage your product MSRP database and monitoring settings with precision
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <Upload className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Import CSV
            </Button>
            <Button size="sm" className="group bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Add Product
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

        {/* Search */}
        <Card className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="relative group">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 dark:text-slate-100">Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-slate-200 dark:border-slate-700">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 dark:border-slate-700">
                    <TableHead className="text-slate-700 dark:text-slate-300">Product Name</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">SKU</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">MSRP</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Category</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Retailers</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Last Updated</TableHead>
                    <TableHead className="text-slate-700 dark:text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="group border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100">{product.name}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">{product.sku}</TableCell>
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100">${product.msrp.toFixed(2)}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">{product.category}</TableCell>
                      <TableCell>
                        <Badge variant={product.monitored ? "default" : "secondary"} className={product.monitored ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" : ""}>
                          {product.monitored ? "Monitored" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">{product.retailers}</TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {new Date(product.lastUpdated).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="group/btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <Edit className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                          </Button>
                          <Button variant="ghost" size="sm" className="group/btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
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

export default Products;
