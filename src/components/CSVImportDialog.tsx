
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface CSVImportDialogProps {
  onImportComplete: () => void;
}

export function CSVImportDialog({ onImportComplete }: CSVImportDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a CSV file.",
        variant: "destructive",
      });
    }
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const product: any = {};
      
      headers.forEach((header, index) => {
        const value = values[index]?.replace(/^"|"$/g, ''); // Remove quotes
        switch (header) {
          case 'name':
            product.name = value;
            break;
          case 'sku':
            product.sku = value;
            break;
          case 'msrp':
            product.msrp = parseFloat(value) || 0;
            break;
          case 'minimum_advertised_price':
          case 'map':
            product.minimum_advertised_price = parseFloat(value) || null;
            break;
          case 'category':
            product.category = value;
            break;
          case 'brand':
            product.brand = value;
            break;
          case 'description':
            product.description = value;
            break;
        }
      });
      
      return product;
    }).filter(product => product.name && product.msrp);
  };

  const handleImport = async () => {
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const products = parseCSV(text);

      if (products.length === 0) {
        throw new Error('No valid products found in CSV');
      }

      const { error } = await supabase
        .from('products')
        .insert(products);

      if (error) throw error;

      toast({
        title: "Import successful",
        description: `Successfully imported ${products.length} products.`,
      });

      setIsOpen(false);
      setFile(null);
      onImportComplete();
    } catch (error) {
      console.error('Error importing CSV:', error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import CSV file.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Upload className="h-4 w-4 mr-2" />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Products from CSV</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv-file">CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <p className="text-sm text-muted-foreground">
              Expected columns: name, sku, msrp, minimum_advertised_price, category, brand, description
            </p>
          </div>
          
          {file && (
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
              <FileText className="h-4 w-4" />
              <span className="text-sm">{file.name}</span>
            </div>
          )}

          <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">CSV Format Requirements:</p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>First row should contain column headers</li>
                <li>Required: name, msrp</li>
                <li>Optional: sku, minimum_advertised_price, category, brand, description</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!file || isImporting}
            >
              {isImporting ? "Importing..." : "Import"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
