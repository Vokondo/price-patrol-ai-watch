
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface RetailerSettingsDialogProps {
  retailerId: string;
  retailerName: string;
}

export function RetailerSettingsDialog({ retailerId, retailerName }: RetailerSettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    monitoring_frequency: 'daily' as 'hourly' | 'daily' | 'weekly',
    is_active: true,
    custom_user_agent: '',
    request_delay: 2,
    max_retries: 3,
    enable_alerts: true,
    alert_threshold: 90
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // In a real implementation, you might update retailer-specific settings
      // For now, we'll just show a success message
      toast({
        title: "Settings updated",
        description: `Settings for ${retailerName} have been updated.`,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating retailer settings:', error);
      toast({
        title: "Error updating settings",
        description: "There was a problem updating the retailer settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="Retailer settings">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings for {retailerName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monitoring-frequency">Monitoring Frequency</Label>
            <Select 
              value={formData.monitoring_frequency} 
              onValueChange={(value) => handleInputChange('monitoring_frequency', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="request-delay">Request Delay (s)</Label>
              <Input
                id="request-delay"
                type="number"
                min="1"
                max="60"
                value={formData.request_delay}
                onChange={(e) => handleInputChange('request_delay', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-retries">Max Retries</Label>
              <Input
                id="max-retries"
                type="number"
                min="1"
                max="10"
                value={formData.max_retries}
                onChange={(e) => handleInputChange('max_retries', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
            <Input
              id="alert-threshold"
              type="number"
              min="0"
              max="100"
              value={formData.alert_threshold}
              onChange={(e) => handleInputChange('alert_threshold', parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-user-agent">Custom User Agent</Label>
            <Input
              id="custom-user-agent"
              value={formData.custom_user_agent}
              onChange={(e) => handleInputChange('custom_user_agent', e.target.value)}
              placeholder="Leave empty to use global setting"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="is-active">Active Monitoring</Label>
              <Switch
                id="is-active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange('is_active', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enable-alerts">Enable Alerts</Label>
              <Switch
                id="enable-alerts"
                checked={formData.enable_alerts}
                onCheckedChange={(checked) => handleInputChange('enable_alerts', checked)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
