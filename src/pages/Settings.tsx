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

  const configSections = [
    {
      title: "Scraping Configuration",
      icon: Clock,
      gradient: "from-slate-600 to-slate-800",
      bgGradient: "from-slate-50 to-slate-100",
      darkBgGradient: "from-slate-950/30 to-slate-900/30"
    },
    {
      title: "Notifications",
      icon: Bell,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      darkBgGradient: "from-blue-950/20 to-indigo-950/20"
    },
    {
      title: "API Configuration",
      icon: Shield,
      gradient: "from-emerald-500 to-green-600",
      bgGradient: "from-emerald-50 to-green-50",
      darkBgGradient: "from-emerald-950/20 to-green-950/20"
    },
    {
      title: "Database",
      icon: Database,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      darkBgGradient: "from-violet-950/20 to-purple-950/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Configure your MAP monitoring system preferences and integrations
            </p>
          </div>
          <Button onClick={handleSave} className="group bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <Save className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Scraping Configuration */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/30 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
                <div className="p-2 rounded-lg bg-gradient-to-r from-slate-600 to-slate-800 text-white shadow-lg">
                  <Clock className="h-5 w-5" />
                </div>
                Scraping Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-slate-700 dark:text-slate-300">Scraping Frequency (hours)</Label>
                <Select value={settings.scrapeFrequency} onValueChange={(value) => 
                  setSettings(prev => ({ ...prev, scrapeFrequency: value }))
                }>
                  <SelectTrigger className="border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
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
                <Label htmlFor="threshold" className="text-slate-700 dark:text-slate-300">Violation Threshold (%)</Label>
                <Input
                  id="threshold"
                  value={settings.violationThreshold}
                  onChange={(e) => setSettings(prev => ({ ...prev, violationThreshold: e.target.value }))}
                  placeholder="90"
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Alert when price is below this percentage of MSRP
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retries" className="text-slate-700 dark:text-slate-300">Max Retries</Label>
                <Input
                  id="retries"
                  value={settings.maxRetries}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxRetries: e.target.value }))}
                  placeholder="3"
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delay" className="text-slate-700 dark:text-slate-300">Request Delay (seconds)</Label>
                <Input
                  id="delay"
                  value={settings.requestDelay}
                  onChange={(e) => setSettings(prev => ({ ...prev, requestDelay: e.target.value }))}
                  placeholder="2"
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                />
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 transition-colors">
                <Switch
                  id="proxy"
                  checked={settings.enableProxy}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableProxy: checked }))}
                />
                <Label htmlFor="proxy" className="text-slate-700 dark:text-slate-300">Enable Proxy Rotation</Label>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                  <Bell className="h-5 w-5" />
                </div>
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 transition-colors">
                <Switch
                  id="email"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Notifications</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alertEmail" className="text-slate-700 dark:text-slate-300">Alert Email</Label>
                <Input
                  id="alertEmail"
                  type="email"
                  value={settings.alertEmail}
                  onChange={(e) => setSettings(prev => ({ ...prev, alertEmail: e.target.value }))}
                  placeholder="admin@company.com"
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                />
              </div>

              <Separator className="bg-slate-200 dark:bg-slate-700" />

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 transition-colors">
                <Switch
                  id="slack"
                  checked={settings.slackNotifications}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, slackNotifications: checked }))}
                />
                <Label htmlFor="slack" className="text-slate-700 dark:text-slate-300">Slack Notifications</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook" className="text-slate-700 dark:text-slate-300">Slack Webhook URL</Label>
                <Input
                  id="webhook"
                  value={settings.slackWebhook}
                  onChange={(e) => setSettings(prev => ({ ...prev, slackWebhook: e.target.value }))}
                  placeholder="https://hooks.slack.com/..."
                  disabled={!settings.slackNotifications}
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg">
                  <Shield className="h-5 w-5" />
                </div>
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="brightData" className="text-slate-700 dark:text-slate-300">Bright Data API Key</Label>
                <Input
                  id="brightData"
                  type="password"
                  value={settings.brightDataKey}
                  onChange={(e) => setSettings(prev => ({ ...prev, brightDataKey: e.target.value }))}
                  placeholder="Enter your Bright Data API key"
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openRouter" className="text-slate-700 dark:text-slate-300">OpenRouter API Key</Label>
                <Input
                  id="openRouter"
                  type="password"
                  value={settings.openRouterKey}
                  onChange={(e) => setSettings(prev => ({ ...prev, openRouterKey: e.target.value }))}
                  placeholder="Enter your OpenRouter API key"
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userAgent" className="text-slate-700 dark:text-slate-300">User Agent String</Label>
                <Textarea
                  id="userAgent"
                  value={settings.userAgent}
                  onChange={(e) => setSettings(prev => ({ ...prev, userAgent: e.target.value }))}
                  placeholder="Mozilla/5.0..."
                  rows={3}
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          {/* Database Configuration */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-slate-900 dark:text-slate-100">
                <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg">
                  <Database className="h-5 w-5" />
                </div>
                Database
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="dbUrl" className="text-slate-700 dark:text-slate-300">Database URL</Label>
                <Input
                  id="dbUrl"
                  value={settings.databaseUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, databaseUrl: e.target.value }))}
                  placeholder="postgresql://user:password@host:port/database"
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
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
    </div>
  );
};

export default Settings;
