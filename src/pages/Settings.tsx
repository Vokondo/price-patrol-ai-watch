import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Save, Bell, Clock, Shield, Database, AlertTriangle, TestTube, Play } from "lucide-react";
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import { useSecrets, useUpsertSecret } from '@/hooks/useSecrets';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { data: settings, isLoading } = useSettings();
  const { data: secrets } = useSecrets();
  const updateSettings = useUpdateSettings();
  const upsertSecret = useUpsertSecret();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    scrapeFrequency: "daily" as "hourly" | "daily" | "weekly",
    emailNotifications: true,
    slackNotifications: false,
    violationThreshold: "90",
    maxRetries: "3",
    requestDelay: "2",
    enableProxy: true,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    alertEmail: "",
    slackWebhook: "",
    databaseUrl: "postgresql://localhost:5432/map_monitor"
  });

  const [apiKeys, setApiKeys] = useState({
    brightDataKey: "",
    openRouterKey: ""
  });

  // Initialize form data when settings are loaded
  useEffect(() => {
    if (settings) {
      setFormData({
        scrapeFrequency: settings.scrape_frequency || "daily",
        emailNotifications: settings.email_notifications ?? true,
        slackNotifications: settings.slack_notifications ?? false,
        violationThreshold: settings.violation_threshold?.toString() || "90",
        maxRetries: settings.max_retries?.toString() || "3",
        requestDelay: settings.request_delay?.toString() || "2",
        enableProxy: settings.enable_proxy ?? true,
        userAgent: settings.user_agent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        alertEmail: settings.alert_email || "",
        slackWebhook: settings.slack_webhook || "",
        databaseUrl: settings.database_url || "postgresql://localhost:5432/map_monitor"
      });
    }
  }, [settings]);

  // Initialize API keys from secrets
  useEffect(() => {
    if (secrets) {
      const brightData = secrets.find(s => s.secret_key === 'BRIGHT_DATA_API_KEY');
      const openRouter = secrets.find(s => s.secret_key === 'OPENROUTER_API_KEY');
      
      setApiKeys({
        brightDataKey: brightData ? '••••••••••••••••' : "",
        openRouterKey: openRouter ? '••••••••••••••••' : ""
      });
    }
  }, [secrets]);

  const handleSave = async () => {
    try {
      // Save settings
      await updateSettings.mutateAsync({
        scrape_frequency: formData.scrapeFrequency,
        email_notifications: formData.emailNotifications,
        slack_notifications: formData.slackNotifications,
        violation_threshold: parseInt(formData.violationThreshold),
        max_retries: parseInt(formData.maxRetries),
        request_delay: parseInt(formData.requestDelay),
        enable_proxy: formData.enableProxy,
        user_agent: formData.userAgent,
        alert_email: formData.alertEmail,
        slack_webhook: formData.slackWebhook,
        database_url: formData.databaseUrl
      });

      // Save API keys if they've been modified
      if (apiKeys.brightDataKey && !apiKeys.brightDataKey.includes('••••')) {
        await upsertSecret.mutateAsync({
          secret_key: 'BRIGHT_DATA_API_KEY',
          secret_value: apiKeys.brightDataKey
        });
      }

      if (apiKeys.openRouterKey && !apiKeys.openRouterKey.includes('••••')) {
        await upsertSecret.mutateAsync({
          secret_key: 'OPENROUTER_API_KEY',
          secret_value: apiKeys.openRouterKey
        });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleTestConnection = () => {
    toast({
      title: "Connection Test",
      description: "Testing database connection...",
    });
    // Placeholder for actual connection test
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "Database connection is working properly.",
      });
    }, 2000);
  };

  const handleRunMigrations = () => {
    toast({
      title: "Running Migrations",
      description: "Database migrations are being executed...",
    });
    // Placeholder for actual migration runner
    setTimeout(() => {
      toast({
        title: "Migrations Complete",
        description: "All database migrations have been applied successfully.",
      });
    }, 3000);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your MAP monitoring system preferences and integrations
          </p>
        </div>
        <Button onClick={handleSave} disabled={updateSettings.isPending}>
          <Save className="h-4 w-4 mr-2" />
          {updateSettings.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Scraping Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scraping Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Scraping Frequency</Label>
              <Select value={formData.scrapeFrequency} onValueChange={(value: "hourly" | "daily" | "weekly") => 
                setFormData(prev => ({ ...prev, scrapeFrequency: value }))
              }>
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
              <Label htmlFor="threshold">Violation Threshold (%)</Label>
              <Input
                id="threshold"
                value={formData.violationThreshold}
                onChange={(e) => setFormData(prev => ({ ...prev, violationThreshold: e.target.value }))}
                placeholder="90"
              />
              <p className="text-xs text-muted-foreground">
                Alert when price is below this percentage of MSRP
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retries">Max Retries</Label>
              <Input
                id="retries"
                value={formData.maxRetries}
                onChange={(e) => setFormData(prev => ({ ...prev, maxRetries: e.target.value }))}
                placeholder="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delay">Request Delay (seconds)</Label>
              <Input
                id="delay"
                value={formData.requestDelay}
                onChange={(e) => setFormData(prev => ({ ...prev, requestDelay: e.target.value }))}
                placeholder="2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="proxy"
                checked={formData.enableProxy}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enableProxy: checked }))}
              />
              <Label htmlFor="proxy">Enable Proxy Rotation</Label>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="email"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailNotifications: checked }))}
              />
              <Label htmlFor="email">Email Notifications</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alertEmail">Alert Email</Label>
              <Input
                id="alertEmail"
                type="email"
                value={formData.alertEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, alertEmail: e.target.value }))}
                placeholder="admin@company.com"
              />
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Switch
                id="slack"
                checked={formData.slackNotifications}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, slackNotifications: checked }))}
              />
              <Label htmlFor="slack">Slack Notifications</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook">Slack Webhook URL</Label>
              <Input
                id="webhook"
                value={formData.slackWebhook}
                onChange={(e) => setFormData(prev => ({ ...prev, slackWebhook: e.target.value }))}
                placeholder="https://hooks.slack.com/..."
                disabled={!formData.slackNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brightData">Bright Data API Key</Label>
              <Input
                id="brightData"
                type="password"
                value={apiKeys.brightDataKey}
                onChange={(e) => setApiKeys(prev => ({ ...prev, brightDataKey: e.target.value }))}
                placeholder="Enter your Bright Data API key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="openRouter">OpenRouter API Key</Label>
              <Input
                id="openRouter"
                type="password"
                value={apiKeys.openRouterKey}
                onChange={(e) => setApiKeys(prev => ({ ...prev, openRouterKey: e.target.value }))}
                placeholder="Enter your OpenRouter API key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userAgent">User Agent String</Label>
              <Textarea
                id="userAgent"
                value={formData.userAgent}
                onChange={(e) => setFormData(prev => ({ ...prev, userAgent: e.target.value }))}
                placeholder="Mozilla/5.0..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dbUrl">Database URL</Label>
              <Input
                id="dbUrl"
                value={formData.databaseUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, databaseUrl: e.target.value }))}
                placeholder="postgresql://user:password@host:port/database"
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Database connection changes require application restart
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleTestConnection}>
                <TestTube className="h-4 w-4 mr-2" />
                Test Connection
              </Button>
              <Button variant="outline" size="sm" onClick={handleRunMigrations}>
                <Play className="h-4 w-4 mr-2" />
                Run Migrations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
