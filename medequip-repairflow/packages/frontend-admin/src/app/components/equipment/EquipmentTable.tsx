import { useState, useEffect } from 'react';
import { apiClient as api } from '../../api';

export default function EquipmentTable({ filters, onEdit }) {
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEquipment = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await api.get(`/equipment?${params}`);
      setEquipment(response.data);
    } catch (error) {
      console.error('Failed to fetch equipment', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, [filters]);

  const handleDeactivate = async (equipmentId) => {
    if (window.confirm('Are you sure you want to deactivate this equipment?')) {
      try {
        await api.patch(`/equipment/${equipmentId}/deactivate`);
        fetchEquipment(); // Refetch to show updated status
      } catch (error) {
        console.error('Failed to deactivate equipment', error);
      }
    }
  };

  if (isLoading) return <p>Loading equipment...</p>;

  return (
    <div className="bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipment.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.serial_number}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.model?.name || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.customer?.name || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onEdit(item)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                {item.status === 'ACTIVE' && (
                  <button onClick={() => handleDeactivate(item.id)} className="text-red-600 hover:text-red-900 ml-4">Deactivate</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
