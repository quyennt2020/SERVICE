import React, { useState } from 'react';
import { adjustPartStock } from '../api';

interface AdjustStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    part: any;
    onStockAdjusted?: () => void;
}

export const AdjustStockModal: React.FC<AdjustStockModalProps> = ({
    isOpen,
    onClose,
    part,
    onStockAdjusted,
}) => {
    const [quantity, setQuantity] = useState<number>(0);
    const [reason, setReason] = useState<string>('');
    const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove'>('add');
    const [loading, setLoading] = useState(false);

    if (!isOpen || !part) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const adjustmentQuantity = adjustmentType === 'add' ? quantity : -quantity;
            await adjustPartStock(part.id, adjustmentQuantity, reason);
            alert('Stock adjusted successfully!');
            if (onStockAdjusted) onStockAdjusted();
            handleClose();
        } catch (error) {
            console.error('Failed to adjust stock', error);
            alert('Failed to adjust stock');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setQuantity(0);
        setReason('');
        setAdjustmentType('add');
        onClose();
    };

    const newStock =
        adjustmentType === 'add'
            ? part.stock + quantity
            : part.stock - quantity;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Adjust Stock</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {part.part_number} - {part.description}
                        </p>
                    </div>
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
                    {/* Current Stock */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Current Stock:</span>
                            <span className="text-2xl font-bold text-gray-900">{part.stock}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm font-medium text-gray-600">Min Stock:</span>
                            <span className="text-sm text-gray-700">{part.min_stock}</span>
                        </div>
                    </div>

                    {/* Adjustment Type */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Adjustment Type
                        </label>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={() => setAdjustmentType('add')}
                                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${adjustmentType === 'add'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                + Add Stock
                            </button>
                            <button
                                type="button"
                                onClick={() => setAdjustmentType('remove')}
                                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${adjustmentType === 'remove'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                - Remove Stock
                            </button>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={quantity || ''}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Reason */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reason
                        </label>
                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select reason...</option>
                            <option value="Purchase">Purchase/Restock</option>
                            <option value="Return">Return from Customer</option>
                            <option value="Used in Repair">Used in Repair</option>
                            <option value="Damaged">Damaged/Defective</option>
                            <option value="Lost">Lost/Missing</option>
                            <option value="Inventory Count">Inventory Count Adjustment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* New Stock Preview */}
                    {quantity > 0 && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-blue-800">New Stock Level:</span>
                                <span className={`text-2xl font-bold ${newStock <= part.min_stock ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                    {newStock}
                                </span>
                            </div>
                            {newStock <= part.min_stock && (
                                <p className="text-xs text-red-600 mt-2">
                                    ⚠️ Warning: New stock will be at or below minimum level
                                </p>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || quantity === 0}
                            className={`px-4 py-2 rounded-md text-white transition-colors ${adjustmentType === 'add'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {loading ? 'Adjusting...' : 'Confirm Adjustment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
