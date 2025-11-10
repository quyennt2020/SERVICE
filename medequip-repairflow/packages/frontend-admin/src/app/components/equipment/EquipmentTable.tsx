import { useState, useEffect } from 'react';
import { apiClient as api } from '../../api';

export default function EquipmentTable({ onEdit }) {
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/equipment');
        setEquipment(response.data);
      } catch (error) {
        console.error('Failed to fetch equipment', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipment.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.serial_number}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.model?.name || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.customer?.name || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => onEdit(item)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
