import { useState, useEffect } from 'react';
import { createTicket, fetchCustomers, fetchEquipment } from '../api';

interface CreateTicketModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateTicketModal({ onClose, onSuccess }: CreateTicketModalProps) {
    const [customerId, setCustomerId] = useState('');
    const [equipmentId, setEquipmentId] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<any[]>([]);
    const [equipmentList, setEquipmentList] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [custData, equipData] = await Promise.all([
                    fetchCustomers(),
                    fetchEquipment()
                ]);
                setCustomers(custData);
                setEquipmentList(equipData);

                // Pre-select first options if available
                if (custData.length > 0) setCustomerId(custData[0].id);
                if (equipData.length > 0) setEquipmentId(equipData[0].id);
            } catch (error) {
                console.error('Failed to load form data', error);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createTicket({
                customer_id: Number(customerId),
                equipment_id: Number(equipmentId),
                issue_description: problemDescription,
                priority: priority,
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to create ticket', error);
            alert('Failed to create ticket');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Ticket</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                        <select
                            id="customer"
                            value={customerId}
                            onChange={(e) => {
                                setCustomerId(e.target.value);
                                setEquipmentId(''); // Reset equipment selection
                            }}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Customer</option>
                            {customers.map((c: any) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
                        <select
                            id="equipment"
                            value={equipmentId}
                            onChange={(e) => setEquipmentId(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Equipment</option>
                            {equipmentList
                                .filter((e: any) => !customerId || e.customer?.id === Number(customerId))
                                .map((e: any) => (
                                    <option key={e.id} value={e.id}>
                                        {e.serial_number} ({e.model?.name})
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">Problem Description</label>
                        <textarea
                            id="problem"
                            value={problemDescription}
                            onChange={(e) => setProblemDescription(e.target.value)}
                            required
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Creating...' : 'Create Ticket'}
                    </button>
                </form>
            </div>
        </div>
    );
}
