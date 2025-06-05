
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  sku?: string;
  msrp: number;
  minimum_advertised_price?: number;
  category?: string;
  brand?: string;
  description?: string;
}

interface EditProductDialogProps {
  product: Product;
  onProductUpdated: () => void;
}

export function EditProductDialog({ product, onProductUpdated }: EditProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    sku: product.sku || '',
    msrp: product.msrp.toString(),
    minimum_advertised_price: product.minimum_advertised_price?.toString() || '',
    category: product.category || '',
    brand: product.brand || '',
    description: product.description || '',
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Validation error",
        description: "Product name is required.",
        variant: "destructive",
      });
      return;
    }

    const msrp = parseFloat(formData.msrp);
    if (isNaN(msrp) || msrp <= 0) {
      toast({
        title: "Validation error",
        description: "MSRP must be a valid positive number.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const updateData: any = {
        name: formData.name.trim(),
        sku: formData.sku.trim() || null,
        msrp,
        category: formData.category.trim() || null,
        brand: formData.brand.trim() || null,
        description: formData.description.trim() || null,
      };

      if (formData.minimum_advertised_price) {
        const map = parseFloat(formData.minimum_advertised_price);
        if (!isNaN(map) && map > 0) {
          updateData.minimum_advertised_price = map;
        }
      }

      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', product.id);

      if (error) throw error;

      toast({
        title: "Product updated",
        description: "Product has been successfully updated.",
      });

      setIsOpen(false);
      onProductUpdated();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error updating product",
        description: "There was a problem updating the product.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="Edit product">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => handleInputChange('sku', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="msrp">MSRP *</Label>
              <Input
                id="msrp"
                type="number"
                step="0.01"
                min="0"
                value={formData.msrp}
                onChange={(e) => handleInputChange('msrp', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="map">Min Advertised Price</Label>
              <Input
                id="map"
                type="number"
                step="0.01"
                min="0"
                value={formData.minimum_advertised_price}
                onChange={(e) => handleInputChange('minimum_advertised_price', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
