
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface ProductFormData {
  name: string;
  sku: string;
  msrp: number;
  minimum_advertised_price?: number;
  category: string;
  brand: string;
  description?: string;
}

interface AddProductFormProps {
  onProductAdded: () => void;
}

export function AddProductForm({ onProductAdded }: AddProductFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProductFormData>();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: data.name,
          sku: data.sku,
          msrp: data.msrp,
          minimum_advertised_price: data.minimum_advertised_price || null,
          category: data.category,
          brand: data.brand,
          description: data.description || null,
        }]);

      if (error) throw error;

      toast({
        title: "Product added successfully",
        description: `${data.name} has been added to your catalog.`,
      });

      reset();
      setOpen(false);
      onProductAdded();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error adding product",
        description: "There was a problem adding the product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
          <SheetDescription>
            Add a new product to your catalog with pricing information.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              {...register("name", { required: "Product name is required" })}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU *</Label>
            <Input
              id="sku"
              {...register("sku", { required: "SKU is required" })}
              placeholder="Enter SKU"
            />
            {errors.sku && <p className="text-sm text-red-500">{errors.sku.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="msrp">MSRP *</Label>
              <Input
                id="msrp"
                type="number"
                step="0.01"
                {...register("msrp", { 
                  required: "MSRP is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "MSRP must be positive" }
                })}
                placeholder="0.00"
              />
              {errors.msrp && <p className="text-sm text-red-500">{errors.msrp.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimum_advertised_price">Min Advertised Price</Label>
              <Input
                id="minimum_advertised_price"
                type="number"
                step="0.01"
                {...register("minimum_advertised_price", { 
                  valueAsNumber: true,
                  min: { value: 0, message: "Price must be positive" }
                })}
                placeholder="0.00"
              />
              {errors.minimum_advertised_price && <p className="text-sm text-red-500">{errors.minimum_advertised_price.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                {...register("category", { required: "Category is required" })}
                placeholder="e.g., Electronics"
              />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                {...register("brand", { required: "Brand is required" })}
                placeholder="e.g., TechBrand"
              />
              {errors.brand && <p className="text-sm text-red-500">{errors.brand.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Product description (optional)"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
