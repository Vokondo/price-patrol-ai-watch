
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';

export function GlobalSettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    scrape_frequency: 'daily' as 'hourly' | 'daily' | 'weekly',
    email_notifications: true,
    slack_notifications: false,
    violation_threshold: 90,
    max_retries: 3,
    request_delay: 2,
    enable_proxy: true,
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    alert_email: '',
    slack_webhook: '',
    database_url: 'postgresql://localhost:5432/map_monitor'
  });

  React.useEffect(() => {
    if (settings) {
      setFormData({
        scrape_frequency: settings.scrape_frequency,
        email_notifications: settings.email_notifications,
        slack_notifications: settings.slack_notifications,
        violation_threshold: settings.violation_threshold,
        max_retries: settings.max_retries,
        request_delay: settings.request_delay,
        enable_proxy: settings.enable_proxy,
        user_agent: settings.user_agent,
        alert_email: settings.alert_email,
        slack_webhook: settings.slack_webhook,
        database_url: settings.database_url
      });
    }
  }, [settings]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateSettings.mutateAsync(formData);
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating global settings:', error);
    }
  };

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Settings className="h-4 w-4 mr-2" />
        Global Settings
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Settings className="h-4 w-4 mr-2" />
          Global Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Global Monitoring Settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scrape-frequency">Scraping Frequency</Label>
              <Select 
                value={formData.scrape_frequency} 
                onValueChange={(value) => handleInputChange('scrape_frequency', value)}
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

            <div className="space-y-2">
              <Label htmlFor="violation-threshold">Violation Threshold (%)</Label>
              <Input
                id="violation-threshold"
                type="number"
                min="0"
                max="100"
                value={formData.violation_threshold}
                onChange={(e) => handleInputChange('violation_threshold', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label htmlFor="request-delay">Request Delay (seconds)</Label>
              <Input
                id="request-delay"
                type="number"
                min="1"
                max="60"
                value={formData.request_delay}
                onChange={(e) => handleInputChange('request_delay', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-proxy">Enable Proxy</Label>
              <Switch
                id="enable-proxy"
                checked={formData.enable_proxy}
                onCheckedChange={(checked) => handleInputChange('enable_proxy', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={formData.email_notifications}
                onCheckedChange={(checked) => handleInputChange('email_notifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="slack-notifications">Slack Notifications</Label>
              <Switch
                id="slack-notifications"
                checked={formData.slack_notifications}
                onCheckedChange={(checked) => handleInputChange('slack_notifications', checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-agent">User Agent</Label>
            <Input
              id="user-agent"
              value={formData.user_agent}
              onChange={(e) => handleInputChange('user_agent', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alert-email">Alert Email</Label>
            <Input
              id="alert-email"
              type="email"
              value={formData.alert_email}
              onChange={(e) => handleInputChange('alert_email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            <Input
              id="slack-webhook"
              type="url"
              value={formData.slack_webhook}
              onChange={(e) => handleInputChange('slack_webhook', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="database-url">Database URL</Label>
            <Input
              id="database-url"
              value={formData.database_url}
              onChange={(e) => handleInputChange('database_url', e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateSettings.isPending}>
              {updateSettings.isPending ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
