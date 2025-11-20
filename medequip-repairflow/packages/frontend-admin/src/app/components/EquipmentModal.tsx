import React, { useState, useEffect } from 'react';
import { fetchCustomers } from '../api';

interface EquipmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    equipment?: any;
    createEquipment: (data: any) => Promise<any>;
    updateEquipment: (id: number, data: any) => Promise<any>;
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({ isOpen, onClose, onSuccess, equipment, createEquipment, updateEquipment }) => {
    const [formData, setFormData] = useState({
        serial_number: '',
        model_id: '',
        customer_id: '',
        location: '',
        install_date: '',
        status: 'Active',
    });
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const customersData = await fetchCustomers();
                setCustomers(customersData);
            } catch (err) {
                console.error('Failed to load customers', err);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        if (equipment) {
            setFormData({
                serial_number: equipment.serial_number || '',
                model_id: equipment.model_id || '', // Assuming model selection is simplified for now or handled elsewhere
                customer_id: equipment.customer_id || '',
                location: equipment.location || '',
                install_date: equipment.install_date ? new Date(equipment.install_date).toISOString().split('T')[0] : '',
                status: equipment.status || 'Active',
            });
        } else {
            setFormData({
                serial_number: '',
                model_id: '1', // Defaulting to 1 for now as we don't have model CRUD yet
                customer_id: '',
                location: '',
                install_date: '',
                status: 'Active',
            });
        }
    }, [equipment, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                model_id: parseInt(formData.model_id),
                customer_id: parseInt(formData.customer_id),
            };

            if (equipment) {
                await updateEquipment(equipment.id, payload);
            } else {
                await createEquipment(payload);
            }
            onSuccess();
            onClose();
        } catch (err) {
            setError('Failed to save equipment. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{equipment ? 'Edit Equipment' : 'New Equipment'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serial_number">
                            Serial Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="serial_number"
                            type="text"
                            placeholder="Serial Number"
                            value={formData.serial_number}
                            onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customer_id">
                            Customer
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="customer_id"
                            value={formData.customer_id}
                            onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                            required
                        >
                            <option value="">Select Customer</option>
                            {customers.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="location"
                            type="text"
                            placeholder="Location (e.g., Room 101)"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="install_date">
                            Install Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="install_date"
                            type="date"
                            value={formData.install_date}
                            onChange={(e) => setFormData({ ...formData, install_date: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Status
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Saving...' : 'Save Equipment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
