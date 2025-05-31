
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Building, Key, Shield, Activity, Calendar } from "lucide-react";

const Account = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    role: "admin",
    timezone: "America/New_York",
    bio: "MAP compliance manager with 5+ years of experience in retail price monitoring."
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileSave = () => {
    console.log("Saving profile:", profile);
    // Here you would save to your backend
  };

  const handlePasswordChange = () => {
    console.log("Changing password");
    // Here you would handle password change
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="space-y-8 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Account Management
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Manage your profile, security settings, and account preferences with sophisticated control
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Overview */}
          <Card className="group md:col-span-1 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                <div className="p-2 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <User className="h-4 w-4" />
                </div>
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-20 w-20 shadow-lg ring-4 ring-slate-200 dark:ring-slate-700 group-hover:ring-slate-300 dark:group-hover:ring-slate-600 transition-all duration-300">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:scale-105 transition-transform duration-300">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{profile.email}</p>
                  <Badge variant="secondary" className="mt-2 bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-slate-200 dark:bg-slate-700" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm group/item hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  <Building className="h-4 w-4 text-slate-500 group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 transition-colors" />
                  <span>{profile.company}</span>
                </div>
                <div className="flex items-center gap-2 text-sm group/item hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  <Phone className="h-4 w-4 text-slate-500 group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 transition-colors" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm group/item hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  <Calendar className="h-4 w-4 text-slate-500 group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 transition-colors" />
                  <span>Member since Jan 2024</span>
                </div>
              </div>

              <Button variant="outline" className="w-full group/btn border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300">
                <span className="group-hover/btn:scale-105 transition-transform duration-300">Upload Photo</span>
              </Button>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card className="group md:col-span-2 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                <div className="p-2 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300 font-medium">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                    className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300 font-medium">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                    className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-700 dark:text-slate-300 font-medium">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-slate-700 dark:text-slate-300 font-medium">Role</Label>
                  <Select value={profile.role} onValueChange={(value) => 
                    setProfile(prev => ({ ...prev, role: value }))
                  }>
                    <SelectTrigger className="border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 hover:shadow-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-slate-700 dark:text-slate-300 font-medium">Timezone</Label>
                  <Select value={profile.timezone} onValueChange={(value) => 
                    setProfile(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger className="border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 hover:shadow-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-700 dark:text-slate-300 font-medium">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md resize-none"
                />
              </div>

              <Button 
                onClick={handleProfileSave}
                className="group/btn bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="group-hover/btn:scale-105 transition-transform duration-300">Save Profile Changes</span>
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="group md:col-span-2 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                <div className="p-2 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Key className="h-4 w-4" />
                </div>
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-slate-700 dark:text-slate-300 font-medium">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                  className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-slate-700 dark:text-slate-300 font-medium">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                    className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300 font-medium">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    className="border-slate-200 dark:border-slate-700 focus:border-slate-400 dark:focus:border-slate-500 focus:ring-slate-400 dark:focus:ring-slate-500 transition-all duration-300 hover:shadow-md"
                  />
                </div>
              </div>

              <Button 
                onClick={handlePasswordChange}
                className="group/btn bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="group-hover/btn:scale-105 transition-transform duration-300">Change Password</span>
              </Button>
            </CardContent>
          </Card>

          {/* Account Activity */}
          <Card className="group md:col-span-1 border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                <div className="p-2 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Activity className="h-4 w-4" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between group/item hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded transition-colors">
                  <span className="text-slate-700 dark:text-slate-300">Last login</span>
                  <span className="text-slate-500 dark:text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 transition-colors">2 hours ago</span>
                </div>
                <div className="flex justify-between group/item hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded transition-colors">
                  <span className="text-slate-700 dark:text-slate-300">Profile updated</span>
                  <span className="text-slate-500 dark:text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 transition-colors">3 days ago</span>
                </div>
                <div className="flex justify-between group/item hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded transition-colors">
                  <span className="text-slate-700 dark:text-slate-300">Password changed</span>
                  <span className="text-slate-500 dark:text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 transition-colors">1 week ago</span>
                </div>
                <div className="flex justify-between group/item hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded transition-colors">
                  <span className="text-slate-700 dark:text-slate-300">Account created</span>
                  <span className="text-slate-500 dark:text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 transition-colors">Jan 15, 2024</span>
                </div>
              </div>

              <Separator className="my-4 bg-slate-200 dark:bg-slate-700" />

              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full group/btn border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
                  <Shield className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                  <span className="group-hover/btn:scale-105 transition-transform duration-300">Enable 2FA</span>
                </Button>
                <Button variant="outline" size="sm" className="w-full group/btn border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300">
                  <span className="group-hover/btn:scale-105 transition-transform duration-300">View Login History</span>
                </Button>
                <Button variant="destructive" size="sm" className="w-full group/btn hover:shadow-md transition-all duration-300">
                  <span className="group-hover/btn:scale-105 transition-transform duration-300">Delete Account</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
