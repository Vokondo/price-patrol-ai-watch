
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Settings, Play, Pause, MoreHorizontal } from "lucide-react";

const Retailers = () => {
  const retailers = [
    {
      id: 1,
      name: "Amazon",
      domain: "amazon.com",
      status: "active",
      products: 456,
      lastScout: "2 hours ago",
      success: 98.2,
      avgResponse: "1.2s"
    },
    {
      id: 2,
      name: "Best Buy",
      domain: "bestbuy.com",
      status: "active",
      products: 234,
      lastScout: "1 hour ago",
      success: 95.8,
      avgResponse: "0.8s"
    },
    {
      id: 3,
      name: "Walmart",
      domain: "walmart.com",
      status: "paused",
      products: 567,
      lastScout: "6 hours ago",
      success: 92.1,
      avgResponse: "2.1s"
    },
    {
      id: 4,
      name: "Target",
      domain: "target.com",
      status: "active",
      products: 123,
      lastScout: "30 minutes ago",
      success: 97.5,
      avgResponse: "1.5s"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Retailer Management</h1>
          <p className="text-muted-foreground">
            Configure and monitor scouting settings for each retailer
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Settings className="h-4 w-4 mr-2" />
            Global Settings
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Retailer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Retailers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">3 paused</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">96.2%</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">1,380</div>
            <p className="text-xs text-muted-foreground">Across all retailers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">1.4s</div>
            <p className="text-xs text-muted-foreground">Network latency</p>
          </CardContent>
        </Card>
      </div>

      {/* Retailers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Retailer Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Retailer</TableHead>
                    <TableHead className="min-w-[150px]">Domain</TableHead>
                    <TableHead className="min-w-[80px]">Status</TableHead>
                    <TableHead className="min-w-[90px]">Products</TableHead>
                    <TableHead className="min-w-[120px]">Last Scout</TableHead>
                    <TableHead className="min-w-[110px]">Success Rate</TableHead>
                    <TableHead className="min-w-[110px]">Avg Response</TableHead>
                    <TableHead className="min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {retailers.map((retailer) => (
                    <TableRow key={retailer.id}>
                      <TableCell className="font-medium">{retailer.name}</TableCell>
                      <TableCell className="text-muted-foreground">{retailer.domain}</TableCell>
                      <TableCell>
                        <Badge variant={retailer.status === "active" ? "default" : "secondary"}>
                          {retailer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{retailer.products}</TableCell>
                      <TableCell className="text-muted-foreground">{retailer.lastScout}</TableCell>
                      <TableCell>
                        <span className={retailer.success > 95 ? "text-green-600" : "text-yellow-600"}>
                          {retailer.success}%
                        </span>
                      </TableCell>
                      <TableCell>{retailer.avgResponse}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <Button variant="ghost" size="sm">
                            {retailer.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Retailers;
