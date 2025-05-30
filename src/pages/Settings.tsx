
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Save, Bell, Clock, Shield, Database, AlertTriangle } from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    scrapeFrequency: "6",
    emailNotifications: true,
    slackNotifications: false,
    violationThreshold: "90",
    maxRetries: "3",
    requestDelay: "2",
    enableProxy: true,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    alertEmail: "admin@company.com",
    slackWebhook: "",
    brightDataKey: "",
    openRouterKey: "",
    databaseUrl: "postgresql://localhost:5432/map_monitor"
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Here you would save to your backend
  };

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
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
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
              <Label htmlFor="frequency">Scraping Frequency (hours)</Label>
              <Select value={settings.scrapeFrequency} onValueChange={(value) => 
                setSettings(prev => ({ ...prev, scrapeFrequency: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Every Hour</SelectItem>
                  <SelectItem value="3">Every 3 Hours</SelectItem>
                  <SelectItem value="6">Every 6 Hours</SelectItem>
                  <SelectItem value="12">Every 12 Hours</SelectItem>
                  <SelectItem value="24">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="threshold">Violation Threshold (%)</Label>
              <Input
                id="threshold"
                value={settings.violationThreshold}
                onChange={(e) => setSettings(prev => ({ ...prev, violationThreshold: e.target.value }))}
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
                value={settings.maxRetries}
                onChange={(e) => setSettings(prev => ({ ...prev, maxRetries: e.target.value }))}
                placeholder="3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delay">Request Delay (seconds)</Label>
              <Input
                id="delay"
                value={settings.requestDelay}
                onChange={(e) => setSettings(prev => ({ ...prev, requestDelay: e.target.value }))}
                placeholder="2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="proxy"
                checked={settings.enableProxy}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableProxy: checked }))}
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
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
              <Label htmlFor="email">Email Notifications</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alertEmail">Alert Email</Label>
              <Input
                id="alertEmail"
                type="email"
                value={settings.alertEmail}
                onChange={(e) => setSettings(prev => ({ ...prev, alertEmail: e.target.value }))}
                placeholder="admin@company.com"
              />
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Switch
                id="slack"
                checked={settings.slackNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, slackNotifications: checked }))}
              />
              <Label htmlFor="slack">Slack Notifications</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook">Slack Webhook URL</Label>
              <Input
                id="webhook"
                value={settings.slackWebhook}
                onChange={(e) => setSettings(prev => ({ ...prev, slackWebhook: e.target.value }))}
                placeholder="https://hooks.slack.com/..."
                disabled={!settings.slackNotifications}
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
                value={settings.brightDataKey}
                onChange={(e) => setSettings(prev => ({ ...prev, brightDataKey: e.target.value }))}
                placeholder="Enter your Bright Data API key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="openRouter">OpenRouter API Key</Label>
              <Input
                id="openRouter"
                type="password"
                value={settings.openRouterKey}
                onChange={(e) => setSettings(prev => ({ ...prev, openRouterKey: e.target.value }))}
                placeholder="Enter your OpenRouter API key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userAgent">User Agent String</Label>
              <Textarea
                id="userAgent"
                value={settings.userAgent}
                onChange={(e) => setSettings(prev => ({ ...prev, userAgent: e.target.value }))}
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
                value={settings.databaseUrl}
                onChange={(e) => setSettings(prev => ({ ...prev, databaseUrl: e.target.value }))}
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
              <Button variant="outline" size="sm">
                Test Connection
              </Button>
              <Button variant="outline" size="sm">
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
