import React, { useEffect, useState } from 'react';
import { fetchEquipment, createEquipment, updateEquipment, deleteEquipment } from '../api';
import { EquipmentModal } from '../components/EquipmentModal';

export const EquipmentListPage = () => {
    const [equipmentList, setEquipmentList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

    const loadEquipment = async () => {
        setLoading(true);
        try {
            const data = await fetchEquipment();
            setEquipmentList(data);
        } catch (error) {
            console.error('Failed to fetch equipment', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEquipment();
    }, []);

    const handleCreate = () => {
        setSelectedEquipment(null);
        setIsModalOpen(true);
    };

    const handleEdit = (equipment: any) => {
        setSelectedEquipment(equipment);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this equipment?')) {
            try {
                await deleteEquipment(id);
                loadEquipment();
            } catch (error) {
                console.error('Failed to delete equipment', error);
            }
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Equipment</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition duration-200"
                >
                    Add New Equipment
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Serial Number
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Model
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentList.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap font-medium">{item.serial_number}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{item.model?.name || 'N/A'}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{item.customer?.name || 'N/A'}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${item.status === 'Active' ? 'text-green-900' : 'text-red-900'}`}>
                                            <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${item.status === 'Active' ? 'bg-green-200' : 'bg-red-200'}`}></span>
                                            <span className="relative">{item.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm text-right">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-blue-600 hover:text-blue-900 mr-4 font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {equipmentList.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-5 border-b border-gray-200 text-sm text-center text-gray-500">
                                        No equipment found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <EquipmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadEquipment}
                equipment={selectedEquipment}
                createEquipment={createEquipment}
                updateEquipment={updateEquipment}
            />
        </div>
    );
};
