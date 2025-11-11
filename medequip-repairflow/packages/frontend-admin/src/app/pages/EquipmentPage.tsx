import { useState } from 'react';
import EquipmentTable from '../components/equipment/EquipmentTable';
import EquipmentFormModal from '../components/equipment/EquipmentFormModal';
import EquipmentFilterBar from '../components/equipment/EquipmentFilterBar';
import { apiClient as api } from '../api';

export default function EquipmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleOpenModal = (equipment = null) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEquipment(null);
    setIsModalOpen(false);
  };

  const handleSave = async (equipmentData) => {
    try {
      if (equipmentData.id) {
        await api.patch(`/equipment/${equipmentData.id}`, equipmentData);
      } else {
        await api.post('/equipment', equipmentData);
      }
      // Trigger a refetch by updating filters state slightly, forces re-render of table
      setFilters(currentFilters => ({...currentFilters}));
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save equipment', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Equipment Management</h1>
        <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Equipment
        </button>
      </div>
      <EquipmentFilterBar onFilterChange={handleFilterChange} />
      <EquipmentTable filters={filters} onEdit={handleOpenModal} />
      <EquipmentFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        equipment={selectedEquipment}
        onSave={handleSave}
      />
    </div>
  );
}
