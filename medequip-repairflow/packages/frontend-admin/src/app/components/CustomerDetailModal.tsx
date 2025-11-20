import React, { useEffect, useState } from 'react';
import { fetchCustomerEquipment, fetchCustomerTickets, fetchCustomerStats } from '../api';

interface CustomerDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    customer: any;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
    isOpen,
    onClose,
    customer,
}) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [equipment, setEquipment] = useState<any[]>([]);
    const [tickets, setTickets] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && customer) {
            loadCustomerData();
        }
    }, [isOpen, customer]);

    const loadCustomerData = async () => {
        if (!customer?.id) return;

        setLoading(true);
        try {
            const [equipmentData, ticketsData, statsData] = await Promise.all([
                fetchCustomerEquipment(customer.id),
                fetchCustomerTickets(customer.id),
                fetchCustomerStats(customer.id),
            ]);

            setEquipment(equipmentData);
            setTickets(ticketsData);
            setStats(statsData);
        } catch (error) {
            console.error('Failed to load customer data', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !customer) return null;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'equipment', label: 'Equipment', icon: '🔧' },
        { id: 'history', label: 'Service History', icon: '📋' },
        { id: 'billing', label: 'Billing', icon: '💰' },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">{customer.name}</h2>
                            <p className="text-blue-100">{customer.address}</p>
                            <p className="text-blue-100 text-sm mt-1">Tax ID: {customer.tax_id}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 bg-gray-50">
                    <div className="flex space-x-1 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <>
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* KPI Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="text-sm text-blue-600 font-medium">Total Tickets</div>
                                            <div className="text-3xl font-bold text-blue-900 mt-1">{stats?.totalTickets || 0}</div>
                                        </div>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="text-sm text-green-600 font-medium">Active Tickets</div>
                                            <div className="text-3xl font-bold text-green-900 mt-1">{stats?.activeTickets || 0}</div>
                                        </div>
                                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                            <div className="text-sm text-purple-600 font-medium">Equipment</div>
                                            <div className="text-3xl font-bold text-purple-900 mt-1">{stats?.totalEquipment || 0}</div>
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm text-gray-500">Name</label>
                                                <p className="text-gray-900 font-medium">{customer.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-500">Email</label>
                                                <p className="text-gray-900 font-medium">{customer.email || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-500">Phone</label>
                                                <p className="text-gray-900 font-medium">{customer.phone || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-500">Tax ID</label>
                                                <p className="text-gray-900 font-medium">{customer.tax_id || 'N/A'}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm text-gray-500">Address</label>
                                                <p className="text-gray-900 font-medium">{customer.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Equipment Tab */}
                            {activeTab === 'equipment' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Equipment ({equipment.length})</h3>
                                    {equipment.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">No equipment found for this customer.</p>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {equipment.map((item) => (
                                                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-semibold text-gray-900">{item.model?.name || 'Unknown Model'}</h4>
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1 text-sm">
                                                        <p className="text-gray-600">S/N: <span className="font-mono text-gray-900">{item.serial_number}</span></p>
                                                        {item.location && <p className="text-gray-600">Location: {item.location}</p>}
                                                        {item.model?.manufacturer && <p className="text-gray-600">Manufacturer: {item.model.manufacturer}</p>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Service History Tab */}
                            {activeTab === 'history' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Service History ({tickets.length})</h3>
                                    {tickets.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">No service history found.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {tickets.map((ticket) => (
                                                <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <h4 className="font-semibold text-gray-900">#{ticket.ticket_ref}</h4>
                                                                <span className={`px-2 py-1 rounded text-xs font-medium ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                                                                        ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                                            'bg-yellow-100 text-yellow-800'
                                                                    }`}>
                                                                    {ticket.status}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-700 text-sm mb-2">{ticket.issue_description}</p>
                                                            <div className="flex gap-4 text-xs text-gray-500">
                                                                {ticket.equipment && <span>Equipment: {ticket.equipment.serial_number}</span>}
                                                                {ticket.assigned_tech && <span>Tech: {ticket.assigned_tech.full_name}</span>}
                                                                <span>Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Billing Tab */}
                            {activeTab === 'billing' && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Billing & Invoices</h3>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                                        <p className="text-yellow-800 font-medium">Billing module coming soon</p>
                                        <p className="text-yellow-600 text-sm mt-2">Invoice management and payment tracking will be available in the next release.</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
