import { useState, useEffect } from 'react';
import Select from 'react-select/async';
import { api } from '../../api';

export default function EquipmentFormModal({ isOpen, onClose, equipment, onSave }) {
  const [formData, setFormData] = useState(equipment || {});

  useEffect(() => {
    setFormData(equipment || {});
  }, [equipment]);

  const loadCustomers = async (inputValue) => {
    const response = await api.get(`/customers/search?q=${inputValue}`);
    return response.data.map(c => ({ label: c.name, value: c.id }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerChange = (customer) => {
    setFormData(prev => ({ ...prev, customer_id: customer.value, customer }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
        <h2 className="text-lg font-bold mb-4">{equipment ? 'Edit' : 'Create'} Equipment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Serial Number</label>
            <input name="serial_number" value={formData.serial_number || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label>Customer</label>
            <Select cacheOptions defaultOptions loadOptions={loadCustomers} value={formData.customer} onChange={handleCustomerChange} />
          </div>
          {/* Add other fields like model, location etc. here */}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
