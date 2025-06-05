
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Download, RefreshCw, Archive, TestTube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RetailerActionsDropdownProps {
  retailerName: string;
  retailerId: string;
}

export function RetailerActionsDropdown({ retailerName, retailerId }: RetailerActionsDropdownProps) {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} for ${retailerName}`,
      description: `${action} functionality has been triggered.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" title="More actions">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleAction("View Details")}>
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("Test Connection")}>
          <TestTube className="h-4 w-4 mr-2" />
          Test Connection
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("Force Refresh")}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Force Refresh
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAction("Export Data")}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => handleAction("Archive")}
          className="text-destructive focus:text-destructive"
        >
          <Archive className="h-4 w-4 mr-2" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
