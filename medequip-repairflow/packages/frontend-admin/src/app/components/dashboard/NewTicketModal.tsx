import { useState, useEffect } from 'react';
import Select from 'react-select/async';
import { api } from '../../api';
import { useDashboardStore } from '../../stores/dashboard.store';

export default function NewTicketModal({ isOpen, onClose }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  // We need a way to refetch tickets on the dashboard
  // This could be done by adding a function to the zustand store

  const loadCustomers = async (inputValue) => {
    const response = await api.get(`/customers/search?q=${inputValue}`);
    return response.data.map(c => ({ label: c.name, value: c.id }));
  };

  const loadEquipment = async (inputValue) => {
    if (!selectedCustomer) return [];
    const response = await api.get(`/equipment/search?customerId=${selectedCustomer.value}&q=${inputValue}`);
    return response.data.map(e => ({ label: e.name, value: e.id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tickets', {
        customerId: selectedCustomer.value,
        equipmentId: selectedEquipment.value,
        issue_description: description,
        priority: priority,
      });
      useDashboardStore.getState().refetchTickets();
      onClose();
    } catch (error) {
      console.error('Failed to create ticket', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
        <h2 className="text-lg font-bold mb-4">Create New Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Customer</label>
            <Select cacheOptions defaultOptions loadOptions={loadCustomers} onChange={setSelectedCustomer} />
          </div>
          <div>
            <label>Equipment</label>
            <Select cacheOptions defaultOptions loadOptions={loadEquipment} onChange={setSelectedEquipment} isDisabled={!selectedCustomer} />
          </div>
          <div>
            <label>Issue Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
