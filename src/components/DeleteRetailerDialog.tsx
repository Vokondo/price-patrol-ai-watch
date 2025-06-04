
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface DeleteRetailerDialogProps {
  retailerId: string;
  retailerName: string;
  onRetailerDeleted: () => void;
}

export function DeleteRetailerDialog({ retailerId, retailerName, onRetailerDeleted }: DeleteRetailerDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('retailers')
        .delete()
        .eq('id', retailerId);

      if (error) throw error;

      toast({
        title: "Retailer deleted",
        description: `${retailerName} has been removed from your retailers.`,
      });

      onRetailerDeleted();
    } catch (error) {
      console.error('Error deleting retailer:', error);
      toast({
        title: "Error deleting retailer",
        description: "There was a problem deleting the retailer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Retailer</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{retailerName}"? This action cannot be undone and will remove all associated monitoring data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
