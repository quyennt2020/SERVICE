import { useState, useEffect } from 'react';

export default function CustomerFormModal({ isOpen, onClose, customer, onSave }) {
  const [formData, setFormData] = useState(customer || {});

  useEffect(() => {
    setFormData(customer || {});
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
        <h2 className="text-lg font-bold mb-4">{customer ? 'Edit' : 'Create'} Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Name</label>
            <input name="name" value={formData.name || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label>Address</label>
            <input name="address" value={formData.address || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label>Tier</label>
            <input name="tier" value={formData.tier || ''} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
