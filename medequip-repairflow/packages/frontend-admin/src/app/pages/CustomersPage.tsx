import { useState } from 'react';
import CustomerTable from '../components/customers/CustomerTable';
import CustomerFormModal from '../components/customers/CustomerFormModal';
import CustomerDetailModal from '../components/customers/CustomerDetailModal';
import { apiClient as api } from '../api';

export default function CustomersPage() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenFormModal = (customer = null) => {
    setSelectedCustomer(customer);
    setIsFormModalOpen(true);
  };

  const handleOpenDetailModal = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  const handleCloseModals = () => {
    setSelectedCustomer(null);
    setIsFormModalOpen(false);
    setIsDetailModalOpen(false);
  };

  const handleSave = async (customerData) => {
    try {
      if (customerData.id) {
        await api.patch(`/customers/${customerData.id}`, customerData);
      } else {
        await api.post('/customers', customerData);
      }
      setRefreshKey(oldKey => oldKey + 1);
      handleCloseModals();
    } catch (error) {
      console.error('Failed to save customer', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button onClick={() => handleOpenFormModal()} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Customer
        </button>
      </div>
      <CustomerTable key={refreshKey} onEdit={handleOpenFormModal} onDetails={handleOpenDetailModal} />
      <CustomerFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        customer={selectedCustomer}
        onSave={handleSave}
      />
      <CustomerDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        customer={selectedCustomer}
      />
    </div>
  );
}
