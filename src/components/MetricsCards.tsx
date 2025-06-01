
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Package, Store, TrendingUp } from "lucide-react";
import { useViolationStats } from '@/hooks/useViolations';
import { useProductStats } from '@/hooks/useProducts';
import { useRetailers } from '@/hooks/useRetailers';

export function MetricsCards() {
  const { data: violationStats, isLoading: violationsLoading } = useViolationStats();
  const { data: productStats, isLoading: productsLoading } = useProductStats();
  const { data: retailers, isLoading: retailersLoading } = useRetailers();

  const metrics = [
    {
      title: "Active Violations",
      value: violationsLoading ? "..." : violationStats?.active || 0,
      icon: AlertTriangle,
      description: "Requires immediate attention",
      color: "text-red-600"
    },
    {
      title: "Products Monitored",
      value: productsLoading ? "..." : productStats?.monitored || 0,
      icon: Package,
      description: `${productStats?.total || 0} total products`,
      color: "text-blue-600"
    },
    {
      title: "Retail Partners",
      value: retailersLoading ? "..." : retailers?.length || 0,
      icon: Store,
      description: "Active monitoring",
      color: "text-green-600"
    },
    {
      title: "Resolved Today",
      value: violationsLoading ? "..." : violationStats?.resolvedToday || 0,
      icon: TrendingUp,
      description: "Compliance actions taken",
      color: "text-purple-600"
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
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
