import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useProducts, useProductStats } from '@/hooks/useProducts';
import { AddProductForm } from '@/components/AddProductForm';
import { DeleteProductDialog } from '@/components/DeleteProductDialog';
import { CSVImportDialog } from '@/components/CSVImportDialog';
import { EditProductDialog } from '@/components/EditProductDialog';
import { format } from 'date-fns';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, isLoading, error, refetch } = useProducts();
  const { data: stats } = useProductStats();

  // Filter products based on search term
  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleProductAdded = () => {
    refetch();
  };

  const handleProductDeleted = () => {
    refetch();
  };

  const handleProductUpdated = () => {
    refetch();
  };

  const handleImportComplete = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Product Catalog</h1>
            <p className="text-muted-foreground">Loading products...</p>
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
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Product Catalog</h1>
            <p className="text-red-600">Error loading products: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground">
            Manage your product MSRP database and monitoring settings
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <CSVImportDialog onImportComplete={handleImportComplete} />
          <AddProductForm onProductAdded={handleProductAdded} />
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{stats?.total || 0}</div>
            <p className="text-xs text-muted-foreground">In catalog</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monitored</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{stats?.monitored || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.total ? Math.round((stats.monitored / stats.total) * 100) : 0}% of catalog
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">
              {products ? [...new Set(products.map(p => p.category).filter(Boolean))].length : 0}
            </div>
            <p className="text-xs text-muted-foreground">Unique categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg MSRP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">
              ${products && products.length > 0 
                ? Math.round(products.reduce((sum, p) => sum + p.msrp, 0) / products.length)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">Portfolio average</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products by name, SKU, or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="rounded-md border p-8 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? 'No products found matching your search.' : 'No products in catalog yet.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Product Name</TableHead>
                      <TableHead className="min-w-[100px]">SKU</TableHead>
                      <TableHead className="min-w-[80px]">MSRP</TableHead>
                      <TableHead className="min-w-[100px]">Min Price</TableHead>
                      <TableHead className="min-w-[100px]">Category</TableHead>
                      <TableHead className="min-w-[100px]">Brand</TableHead>
                      <TableHead className="min-w-[100px]">Created</TableHead>
                      <TableHead className="min-w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                        <TableCell>${product.msrp}</TableCell>
                        <TableCell>
                          {product.minimum_advertised_price ? `$${product.minimum_advertised_price}` : '—'}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {product.created_at ? format(new Date(product.created_at), 'MMM dd, yyyy') : '—'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1 md:space-x-2">
                            <EditProductDialog
                              product={product}
                              onProductUpdated={handleProductUpdated}
                            />
                            <DeleteProductDialog
                              productId={product.id}
                              productName={product.name}
                              onProductDeleted={handleProductDeleted}
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

export default Products;
