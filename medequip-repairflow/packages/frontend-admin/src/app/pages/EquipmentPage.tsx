import { useState } from 'react';
import EquipmentTable from '../components/equipment/EquipmentTable';
import EquipmentFormModal from '../components/equipment/EquipmentFormModal';
import { api } from '../api';

export default function EquipmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // To trigger table refresh

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
      setRefreshKey(oldKey => oldKey + 1); // Trigger refresh
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
      <EquipmentTable key={refreshKey} onEdit={handleOpenModal} />
      <EquipmentFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        equipment={selectedEquipment}
        onSave={handleSave}
      />
    </div>
  );
}
