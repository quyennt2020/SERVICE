import React, { useState, useEffect } from 'react';
import { fetchPartInventoryLogs } from '../api';

interface PartDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    part: any;
    onEdit?: (part: any) => void;
    onAdjustStock?: (part: any) => void;
}

export const PartDetailModal: React.FC<PartDetailModalProps> = ({
    isOpen,
    onClose,
    part,
    onEdit,
    onAdjustStock,
}) => {
    const [logs, setLogs] = useState<any[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(false);

    useEffect(() => {
        if (isOpen && part) {
            loadInventoryLogs();
        }
    }, [isOpen, part]);

    const loadInventoryLogs = async () => {
        if (!part) return;
        setLoadingLogs(true);
        try {
            const data = await fetchPartInventoryLogs(part.id);
            setLogs(data);
        } catch (error) {
            console.error('Failed to load inventory logs', error);
        } finally {
            setLoadingLogs(false);
        }
    };

    if (!isOpen || !part) return null;

    const getStockStatusClass = () => {
        if (part.stock === 0) return 'bg-red-100 text-red-800';
        if (part.stock <= part.min_stock) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getStockStatusText = () => {
        if (part.stock === 0) return 'Out of Stock';
        if (part.stock <= part.min_stock) return 'Low Stock';
        return 'In Stock';
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 my-8 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{part.part_number}</h2>
                        <p className="text-sm text-gray-600 mt-1">{part.description}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* Status Banner */}
                    <div className={`mb-6 p-4 rounded-lg ${getStockStatusClass()}`}>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">
                                Status: {getStockStatusText()}
                            </span>
                            <span className="text-2xl font-bold">{part.stock} units</span>
                        </div>
                    </div>

                    {/* Part Details Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Inventory Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-gray-600">Current Stock:</span>
                                    <p className="text-lg font-semibold text-gray-900">{part.stock}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Minimum Stock:</span>
                                    <p className="text-lg font-semibold text-gray-900">{part.min_stock}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Location:</span>
                                    <p className="text-lg font-semibold text-gray-900">{part.location || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Status:</span>
                                    <p className="text-lg font-semibold text-gray-900">{part.status || 'Active'}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Pricing Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-gray-600">Cost Price:</span>
                                    <p className="text-lg font-semibold text-gray-900">
                                        ${part.cost ? Number(part.cost).toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Selling Price:</span>
                                    <p className="text-lg font-semibold text-gray-900">
                                        ${part.price ? Number(part.price).toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Margin:</span>
                                    <p className="text-lg font-semibold text-green-600">
                                        {part.cost && part.price
                                            ? `$${(Number(part.price) - Number(part.cost)).toFixed(2)} (${(
                                                ((Number(part.price) - Number(part.cost)) / Number(part.price)) *
                                                100
                                            ).toFixed(1)}%)`
                                            : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Total Value:</span>
                                    <p className="text-lg font-semibold text-blue-600">
                                        ${part.cost ? (Number(part.cost) * part.stock).toFixed(2) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Logs */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        {loadingLogs ? (
                            <div className="text-center py-8 text-gray-500">Loading activity...</div>
                        ) : logs.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">No activity recorded yet.</div>
                        ) : (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Change
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Reason
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {logs.slice(0, 10).map((log, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {new Date(log.created_at).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span
                                                        className={`font-semibold ${log.change > 0 ? 'text-green-600' : 'text-red-600'
                                                            }`}
                                                    >
                                                        {log.change > 0 ? '+' : ''}
                                                        {log.change}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{log.reason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <div className="flex space-x-3">
                        {onAdjustStock && (
                            <button
                                onClick={() => {
                                    onAdjustStock(part);
                                    onClose();
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Adjust Stock
                            </button>
                        )}
                        {onEdit && (
                            <button
                                onClick={() => {
                                    onEdit(part);
                                    onClose();
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Edit Part
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
