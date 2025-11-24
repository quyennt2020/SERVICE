import React, { useEffect, useState } from 'react';
import { fetchParts, fetchLowStockParts } from '../api';
import { PartDetailModal } from '../components/PartDetailModal';
import { AdjustStockModal } from '../components/AdjustStockModal';

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

export const PartsPage = () => {
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLowStockOnly, setShowLowStockOnly] = useState(false);
    const [selectedPart, setSelectedPart] = useState<Part | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

    useEffect(() => {
        loadParts();
    }, [showLowStockOnly]);

    const loadParts = async () => {
        try {
            const data = showLowStockOnly
                ? await fetchLowStockParts()
                : await fetchParts();
            setParts(data);
        } catch (error) {
            console.error('Failed to load parts', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewPart = (part: Part) => {
        setSelectedPart(part);
        setIsDetailModalOpen(true);
    };

    const handleAdjustStock = (part: Part) => {
        setSelectedPart(part);
        setIsAdjustModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedPart(null);
    };

    const handleCloseAdjustModal = () => {
        setIsAdjustModalOpen(false);
        setSelectedPart(null);
    };

    const handleStockAdjusted = () => {
        loadParts();
    };

    const getStockStatusClass = (stock: number, minStock: number) => {
        if (stock === 0) return 'bg-red-100 text-red-800';
        if (stock <= minStock) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getStockStatusText = (stock: number, minStock: number) => {
        if (stock === 0) return 'Out of Stock';
        if (stock <= minStock) return 'Low Stock';
        return 'In Stock';
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Parts Inventory</h1>
                    <p className="text-gray-600">Manage parts and stock levels</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                        className={`px-4 py-2 rounded-md transition-colors ${showLowStockOnly
                                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {showLowStockOnly ? 'Show All' : 'Low Stock Only'}
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        + Add Part
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading parts...</div>
                ) : parts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        {showLowStockOnly
                            ? 'No low stock parts found.'
                            : 'No parts found.'}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Part Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Min Stock
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cost
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {parts.map((part) => (
                                    <tr key={part.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                            {part.part_number}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {part.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {part.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {part.min_stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockStatusClass(
                                                    part.stock,
                                                    part.min_stock
                                                )}`}
                                            >
                                                {getStockStatusText(part.stock, part.min_stock)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${part.cost ? Number(part.cost).toFixed(2) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${part.price ? Number(part.price).toFixed(2) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {part.location || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => handleViewPart(part)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleAdjustStock(part)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                Adjust
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modals */}
            <PartDetailModal
                isOpen={isDetailModalOpen}
                onClose={handleCloseDetailModal}
                part={selectedPart}
                onAdjustStock={handleAdjustStock}
            />

            <AdjustStockModal
                isOpen={isAdjustModalOpen}
                onClose={handleCloseAdjustModal}
                part={selectedPart}
                onStockAdjusted={handleStockAdjusted}
            />
        </div>
    );
};
