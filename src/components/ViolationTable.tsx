
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useViolations } from '@/hooks/useViolations';
import { format } from 'date-fns';

export function ViolationTable() {
  const { data: violations, isLoading, error } = useViolations();

  if (isLoading) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">Loading violations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-red-600">Error loading violations: {error.message}</p>
      </div>
    );
  }

  if (!violations || violations.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground">No violations found.</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'resolved':
        return <Badge variant="default">Resolved</Badge>;
      case 'investigating':
        return <Badge variant="secondary">Investigating</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Retailer</TableHead>
            <TableHead>Violation Type</TableHead>
            <TableHead>Advertised Price</TableHead>
            <TableHead>Min Price</TableHead>
            <TableHead>Difference</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {violations.map((violation) => (
            <TableRow key={violation.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{violation.products?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {violation.products?.sku} • {violation.products?.brand}
                  </div>
                </div>
              </TableCell>
              <TableCell>{violation.retailers?.name}</TableCell>
              <TableCell className="capitalize">
                {violation.violation_type.replace('_', ' ')}
              </TableCell>
              <TableCell>${violation.advertised_price}</TableCell>
              <TableCell>${violation.minimum_price}</TableCell>
              <TableCell>
                <div className="text-red-600">
                  -${violation.difference_amount} ({violation.difference_percentage}%)
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(violation.status)}</TableCell>
              <TableCell>
                {format(new Date(violation.detected_at), 'MMM dd, yyyy HH:mm')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
