
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Package, Store, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useViolationStats } from '@/hooks/useViolations';
import { useProductStats } from '@/hooks/useProducts';
import { useRetailers } from '@/hooks/useRetailers';
import { useNavigate } from 'react-router-dom';

export function MetricsCards() {
  const { data: violationStats, isLoading: violationsLoading } = useViolationStats();
  const { data: productStats, isLoading: productsLoading } = useProductStats();
  const { data: retailers, isLoading: retailersLoading } = useRetailers();
  const navigate = useNavigate();

  const metrics = [
    {
      title: "Active Violations",
      value: violationsLoading ? "..." : violationStats?.active || 0,
      icon: AlertTriangle,
      description: "Requires immediate attention",
      trend: "+12%",
      trendDirection: "up",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
      onClick: () => navigate('/violations')
    },
    {
      title: "Products Monitored",
      value: productsLoading ? "..." : productStats?.monitored || 0,
      icon: Package,
      description: `${productStats?.total || 0} total in catalog`,
      trend: "+5%",
      trendDirection: "up",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      onClick: () => navigate('/products')
    },
    {
      title: "Retail Partners",
      value: retailersLoading ? "..." : retailers?.length || 0,
      icon: Store,
      description: "Active monitoring channels",
      trend: "0%",
      trendDirection: "stable",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      onClick: () => navigate('/retailers')
    },
    {
      title: "Resolved Today",
      value: violationsLoading ? "..." : violationStats?.resolvedToday || 0,
      icon: TrendingUp,
      description: "Compliance actions taken",
      trend: "-8%",
      trendDirection: "down",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      onClick: () => navigate('/violations')
    }
  ];

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card 
          key={index} 
          className="metric-card border-2 hover:border-success/30 hover:bg-success/5 transition-all duration-200 cursor-pointer hover:shadow-md"
          onClick={metric.onClick}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center ${metric.bgColor} ${metric.borderColor} border`}>
              <metric.icon className={`h-4 w-4 md:h-5 md:w-5 ${metric.color} icon-line`} />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl md:text-metric font-bold text-foreground">{metric.value}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs md:text-sm text-muted-foreground">
                {metric.description}
              </p>
              <div className={`flex items-center space-x-1 text-xs font-medium ${getTrendColor(metric.trendDirection)}`}>
                {getTrendIcon(metric.trendDirection)}
                <span>{metric.trend}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
