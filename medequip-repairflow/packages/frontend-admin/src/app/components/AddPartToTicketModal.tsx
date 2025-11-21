import React, { useState, useEffect } from 'react';
import { fetchParts, logPartUsage } from '../api';

interface Part {
    id: number;
    part_number: string;
    description: string;
    stock: number;
    min_stock: number;
    cost: number;
    price: number;
    location: string;
    status: string;
}

interface AddPartToTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketId: number;
    onPartAdded?: () => void;
}

export const AddPartToTicketModal: React.FC<AddPartToTicketModalProps> = ({
    isOpen,
    onClose,
    ticketId,
    onPartAdded,
}) => {
    const [parts, setParts] = useState<Part[]>([]);
    const [selectedPartId, setSelectedPartId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectedPart = parts.find((p) => p.id === selectedPartId);

    useEffect(() => {
        if (isOpen) {
            loadParts();
        }
    }, [isOpen]);

    const loadParts = async () => {
        try {
            const data = await fetchParts();
            // Filter only active parts with stock
            setParts(data.filter((p: Part) => p.status === 'Active'));
        } catch (err) {
            console.error('Failed to load parts', err);
            setError('Failed to load parts');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPartId) {
            setError('Please select a part');
            return;
        }

        if (quantity < 1) {
            setError('Quantity must be at least 1');
            return;
        }

        if (selectedPart && quantity > selectedPart.stock) {
            setError(`Insufficient stock. Available: ${selectedPart.stock}`);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await logPartUsage(ticketId, selectedPartId, quantity);
            alert('Part added successfully!');
            if (onPartAdded) onPartAdded();
            handleClose();
        } catch (err: any) {
            console.error('Failed to add part', err);
            setError(err.response?.data?.message || 'Failed to add part');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedPartId(null);
        setQuantity(1);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">Add Part to Ticket</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Part Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Part *
                        </label>
                        <select
                            value={selectedPartId || ''}
                            onChange={(e) => setSelectedPartId(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">-- Select a part --</option>
                            {parts.map((part) => (
                                <option key={part.id} value={part.id}>
                                    {part.part_number} - {part.description} (Stock: {part.stock})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Part Details (if selected) */}
                    {selectedPart && (
                        <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="font-medium text-gray-600">Part Number:</span>
                                    <span className="ml-2 text-gray-800">{selectedPart.part_number}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Location:</span>
                                    <span className="ml-2 text-gray-800">{selectedPart.location}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Available Stock:</span>
                                    <span className={`ml-2 font-semibold ${selectedPart.stock <= selectedPart.min_stock ? 'text-red-600' : 'text-green-600'}`}>
                                        {selectedPart.stock} units
                                    </span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Cost:</span>
                                    <span className="ml-2 text-gray-800">${Number(selectedPart.cost || 0).toFixed(2)}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-600">Price:</span>
                                    <span className="ml-2 text-gray-800">${Number(selectedPart.price || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity *
                        </label>
                        <input
                            type="number"
                            min="1"
                            max={selectedPart?.stock || 999}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {selectedPart && quantity > selectedPart.stock && (
                            <p className="mt-1 text-sm text-red-600">
                                ⚠️ Quantity exceeds available stock ({selectedPart.stock} units)
                            </p>
                        )}
                    </div>

                    {/* Total Cost Preview */}
                    {selectedPart && quantity > 0 && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">Total Cost:</span>
                                <span className="text-lg font-bold text-blue-600">
                                    ${(Number(selectedPart.cost || 0) * quantity).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm font-medium text-gray-700">Total Price:</span>
                                <span className="text-lg font-bold text-green-600">
                                    ${(Number(selectedPart.price || 0) * quantity).toFixed(2)}
                                </span>
                            </div>
                            <div className="mt-2 pt-2 border-t border-blue-300">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">New Stock Level:</span>
                                    <span className={`text-sm font-semibold ${(selectedPart.stock - quantity) <= selectedPart.min_stock ? 'text-red-600' : 'text-gray-800'}`}>
                                        {selectedPart.stock - quantity} units
                                        {(selectedPart.stock - quantity) <= selectedPart.min_stock && ' ⚠️ Low Stock'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                            disabled={loading || !selectedPartId || quantity < 1 || (selectedPart && quantity > selectedPart.stock)}
                        >
                            {loading ? 'Adding...' : 'Add Part'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
