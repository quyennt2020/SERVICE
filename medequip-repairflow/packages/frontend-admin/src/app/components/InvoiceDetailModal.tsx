import React from 'react';
import { recordPayment } from '../api';

interface InvoiceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    invoice: any;
    onInvoiceUpdated?: () => void;
}

export const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({ isOpen, onClose, invoice, onInvoiceUpdated }) => {
    if (!isOpen || !invoice) return null;

    const handleRecordPayment = async () => {
        try {
            await recordPayment(invoice.id);
            alert('Payment recorded successfully!');
            if (onInvoiceUpdated) onInvoiceUpdated();
            onClose();
        } catch (error) {
            console.error('Failed to record payment', error);
            alert('Failed to record payment');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 my-8 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Invoice {invoice.invoice_ref}</h2>
                        <p className="text-sm text-gray-500">
                            Issued: {new Date(invoice.issue_date).toLocaleDateString()}
                        </p>
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
                <div className="p-8 overflow-y-auto flex-1">
                    {/* Status Banner */}
                    <div className={`mb-8 p-4 rounded-lg flex justify-between items-center ${invoice.status === 'Paid' ? 'bg-green-50 border border-green-200' :
                        invoice.status === 'Overdue' ? 'bg-red-50 border border-red-200' :
                            'bg-yellow-50 border border-yellow-200'
                        }`}>
                        <div className="flex items-center">
                            <span className={`text-lg font-semibold ${invoice.status === 'Paid' ? 'text-green-800' :
                                invoice.status === 'Overdue' ? 'text-red-800' :
                                    'text-yellow-800'
                                }`}>
                                Status: {invoice.status}
                            </span>
                        </div>
                        {invoice.status !== 'Paid' && (
                            <button
                                onClick={handleRecordPayment}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                                Record Payment
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-12 mb-12">
                        {/* From */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">From</h3>
                            <div className="text-gray-800">
                                <p className="font-bold text-lg">MedEquip Services</p>
                                <p>123 Medical Plaza</p>
                                <p>Tech City, TC 90210</p>
                                <p>billing@medequip.com</p>
                            </div>
                        </div>

                        {/* To */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Bill To</h3>
                            <div className="text-gray-800">
                                <p className="font-bold text-lg">{invoice.customer?.name}</p>
                                <p>{invoice.customer?.email}</p>
                                <p>{invoice.customer?.phone}</p>
                                <p className="mt-2 text-sm text-gray-500">Tax ID: {invoice.customer?.tax_id || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="mb-12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Line Items</h3>
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {invoice.line_items?.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.quantity}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 text-right">${Number(item.unit_price).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">${Number(item.total).toFixed(2)}</td>
                                    </tr>
                                ))}
                                {(!invoice.line_items || invoice.line_items.length === 0) && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">
                                            No line items found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-64 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${Number(invoice.sub_total).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (10%)</span>
                                <span>${Number(invoice.tax).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                                <span>Total</span>
                                <span>${Number(invoice.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex justify-end space-x-4 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};
