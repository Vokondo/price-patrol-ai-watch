import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Pause } from "lucide-react";
import { useRetailers } from '@/hooks/useRetailers';
import { AddRetailerForm } from '@/components/AddRetailerForm';
import { DeleteRetailerDialog } from '@/components/DeleteRetailerDialog';
import { GlobalSettingsDialog } from '@/components/GlobalSettingsDialog';
import { RetailerSettingsDialog } from '@/components/RetailerSettingsDialog';
import { RetailerActionsDropdown } from '@/components/RetailerActionsDropdown';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

const Retailers = () => {
  const { data: retailers, isLoading, error, refetch } = useRetailers();
  const { toast } = useToast();

  const handleRetailerAdded = () => {
    refetch();
  };

  const handleRetailerDeleted = () => {
    refetch();
  };

  const handleToggleStatus = async (retailerId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    
    try {
      const { error } = await supabase
        .from('retailers')
        .update({ status: newStatus })
        .eq('id', retailerId);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Retailer has been ${newStatus === 'active' ? 'activated' : 'paused'}.`,
      });

      refetch();
    } catch (error) {
      console.error('Error updating retailer status:', error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the retailer status.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Retailer Management</h1>
            <p className="text-muted-foreground">Loading retailers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Retailer Management</h1>
            <p className="text-red-600">Error loading retailers: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const activeRetailers = retailers?.filter(r => r.status === 'active') || [];
  const pausedRetailers = retailers?.filter(r => r.status !== 'active') || [];

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
          <GlobalSettingsDialog />
          <AddRetailerForm onRetailerAdded={handleRetailerAdded} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Retailers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{activeRetailers.length}</div>
            <p className="text-xs text-muted-foreground">{pausedRetailers.length} paused</p>
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
            <CardTitle className="text-sm font-medium">Total Retailers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{retailers?.length || 0}</div>
            <p className="text-xs text-muted-foreground">In system</p>
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
          {!retailers || retailers.length === 0 ? (
            <div className="rounded-md border p-8 text-center">
              <p className="text-muted-foreground">No retailers added yet. Add your first retailer to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[120px]">Retailer</TableHead>
                      <TableHead className="min-w-[150px]">Website</TableHead>
                      <TableHead className="min-w-[80px]">Status</TableHead>
                      <TableHead className="min-w-[120px]">Contact Email</TableHead>
                      <TableHead className="min-w-[120px]">Created</TableHead>
                      <TableHead className="min-w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retailers.map((retailer) => (
                      <TableRow key={retailer.id}>
                        <TableCell className="font-medium">{retailer.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {retailer.website_url ? (
                            <a href={retailer.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {retailer.website_url}
                            </a>
                          ) : '—'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={retailer.status === "active" ? "default" : "secondary"}>
                            {retailer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {retailer.contact_email || '—'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {retailer.created_at ? format(new Date(retailer.created_at), 'MMM dd, yyyy') : '—'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 md:space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleToggleStatus(retailer.id, retailer.status)}
                              title={retailer.status === "active" ? "Pause monitoring" : "Resume monitoring"}
                            >
                              {retailer.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <RetailerSettingsDialog
                              retailerId={retailer.id}
                              retailerName={retailer.name}
                            />
                            <DeleteRetailerDialog
                              retailerId={retailer.id}
                              retailerName={retailer.name}
                              onRetailerDeleted={handleRetailerDeleted}
                            />
                            <RetailerActionsDropdown
                              retailerId={retailer.id}
                              retailerName={retailer.name}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Retailers;
