
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface RetailerFormData {
  name: string;
  website_url: string;
  contact_email?: string;
}

interface AddRetailerFormProps {
  onRetailerAdded: () => void;
}

export function AddRetailerForm({ onRetailerAdded }: AddRetailerFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RetailerFormData>();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (data: RetailerFormData) => {
    try {
      const { error } = await supabase
        .from('retailers')
        .insert([{
          name: data.name,
          website_url: data.website_url,
          contact_email: data.contact_email || null,
          status: 'active'
        }]);

      if (error) throw error;

      toast({
        title: "Retailer added successfully",
        description: `${data.name} has been added to your retailers.`,
      });

      reset();
      setOpen(false);
      onRetailerAdded();
    } catch (error) {
      console.error('Error adding retailer:', error);
      toast({
        title: "Error adding retailer",
        description: "There was a problem adding the retailer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Retailer
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add New Retailer</SheetTitle>
          <SheetDescription>
            Add a new retailer to monitor for price compliance.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Retailer Name *</Label>
            <Input
              id="name"
              {...register("name", { required: "Retailer name is required" })}
              placeholder="Enter retailer name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL *</Label>
            <Input
              id="website_url"
              type="url"
              {...register("website_url", { required: "Website URL is required" })}
              placeholder="https://www.retailer.com"
            />
            {errors.website_url && <p className="text-sm text-red-500">{errors.website_url.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input
              id="contact_email"
              type="email"
              {...register("contact_email")}
              placeholder="contact@retailer.com"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Retailer"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
