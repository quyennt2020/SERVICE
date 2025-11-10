import { useState } from 'react';

// Placeholder Tab components
const OverviewTab = () => <div>Overview content goes here.</div>;
const ContactsTab = () => <div>Contacts content goes here.</div>;
const EquipmentTab = () => <div>Equipment content goes here.</div>;
const ServiceHistoryTab = () => <div>Service History content goes here.</div>;
const BillingTab = () => <div>Billing content goes here.</div>;

export default function CustomerDetailModal({ isOpen, onClose, customer }) {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contacts': return <ContactsTab />;
      case 'equipment': return <EquipmentTab />;
      case 'history': return <ServiceHistoryTab />;
      case 'billing': return <BillingTab />;
      default: return <OverviewTab />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">{customer?.name} - 360° View</h2>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('overview')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Overview</button>
            <button onClick={() => setActiveTab('contacts')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'contacts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Contacts</button>
            <button onClick={() => setActiveTab('equipment')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'equipment' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Equipment</button>
            <button onClick={() => setActiveTab('history')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Service History</button>
            <button onClick={() => setActiveTab('billing')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'billing' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Billing</button>
          </nav>
        </div>
        <div className="flex-grow overflow-y-auto py-4">
          {renderTabContent()}
        </div>
        <div className="flex justify-end pt-4 border-t">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}
