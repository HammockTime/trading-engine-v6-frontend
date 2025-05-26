import React from 'react';
import { useAuth } from '../hooks/useMocks';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Name</span>
              <span className="text-sm text-muted-foreground">{user?.name || 'User'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Email</span>
              <span className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</span>
            </div>
          </div>
          <div className="pt-4">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Notification Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email Notifications</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Price Alerts</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
          </div>
          <div className="pt-4">
            <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
