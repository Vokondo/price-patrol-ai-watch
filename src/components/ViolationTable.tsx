
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, AlertTriangle } from "lucide-react";

interface ViolationTableProps {
  showRecent?: boolean;
}

export function ViolationTable({ showRecent = false }: ViolationTableProps) {
  const violations = [
    {
      id: 1,
      product: "Samsung Galaxy S24 Ultra",
      retailer: "Amazon",
      msrp: 1199.99,
      price: 999.99,
      difference: 200.00,
      timestamp: "2024-01-15 14:30:00",
      url: "https://amazon.com/product/123",
      status: "active"
    },
    {
      id: 2,
      product: "Apple iPhone 15 Pro",
      retailer: "Best Buy",
      msrp: 999.99,
      price: 899.99,
      difference: 100.00,
      timestamp: "2024-01-15 13:45:00",
      url: "https://bestbuy.com/product/456",
      status: "active"
    },
    {
      id: 3,
      product: "MacBook Pro 14\"",
      retailer: "Walmart",
      msrp: 1999.99,
      price: 1799.99,
      difference: 200.00,
      timestamp: "2024-01-15 12:15:00",
      url: "https://walmart.com/product/789",
      status: "contacted"
    },
    {
      id: 4,
      product: "Sony WH-1000XM5",
      retailer: "Target",
      msrp: 399.99,
      price: 329.99,
      difference: 70.00,
      timestamp: "2024-01-15 11:20:00",
      url: "https://target.com/product/321",
      status: "resolved"
    }
  ];

  const displayedViolations = showRecent ? violations.slice(0, 3) : violations;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Retailer</TableHead>
            <TableHead>MSRP</TableHead>
            <TableHead>Advertised Price</TableHead>
            <TableHead>Difference</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedViolations.map((violation) => (
            <TableRow key={violation.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span>{violation.product}</span>
                </div>
              </TableCell>
              <TableCell>{violation.retailer}</TableCell>
              <TableCell>${violation.msrp.toFixed(2)}</TableCell>
              <TableCell className="text-red-600 font-medium">
                ${violation.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-red-600">
                -${violation.difference.toFixed(2)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(violation.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant={
                  violation.status === "active" ? "destructive" :
                  violation.status === "contacted" ? "secondary" : "default"
                }>
                  {violation.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
