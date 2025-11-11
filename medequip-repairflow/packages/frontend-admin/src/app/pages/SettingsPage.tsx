import { useState } from 'react';

import UserManagementTab from '../components/settings/UserManagementTab';
import SystemSettingsTab from '../components/settings/SystemSettingsTab';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('users')}
            className={`${
              activeTab === 'users'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`${
              activeTab === 'system'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            System Settings
          </button>
        </nav>
      </div>

      <div className="py-6">
        {activeTab === 'users' && <UserManagementTab />}
        {activeTab === 'system' && <SystemSettingsTab />}
      </div>
    </div>
  );
}
