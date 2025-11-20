import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTicket, addDiagnosis, createQuote, updateQuoteStatus, logPartUsage, completeRepair, fetchUsers, assignTicket } from '../api';

interface Ticket {
    id: number;
    ticket_ref: string;
    status: string;
    issue_description: string;
    customer?: { name: string };
    equipment?: { name: string };
    quotes?: { id: number; status: string }[];
    invoice?: { invoice_ref: string };
    assigned_tech?: { id: number; name: string };
}

export const TicketDetailPage = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [diagnosis, setDiagnosis] = useState('');
    const [quoteItems, setQuoteItems] = useState([{ description: '', price: 0 }]);
    const [loading, setLoading] = useState(true);
    const [technicians, setTechnicians] = useState<any[]>([]);
    const [selectedTech, setSelectedTech] = useState('');

    useEffect(() => {
        loadTicket();
        loadTechnicians();
    }, [id]);

    const loadTicket = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const data = await fetchTicket(id);
            setTicket(data);
            if (data.assigned_tech) {
                setSelectedTech(data.assigned_tech.id.toString());
            }
        } catch (error) {
            console.error('Failed to load ticket', error);
        } finally {
            setLoading(false);
        }
    };

    const loadTechnicians = async () => {
        try {
            const users = await fetchUsers();
            // Filter for technicians (assuming role 'TECHNICIAN' or 'ADMIN' can be assigned)
            // For now, just showing all users to make testing easier
            setTechnicians(users);
        } catch (error) {
            console.error('Failed to load technicians', error);
        }
    };

    const handleAssignTech = async () => {
        if (!id || !selectedTech) return;
        try {
            await assignTicket(Number(id), Number(selectedTech));
            alert('Technician assigned successfully');
            loadTicket();
        } catch (error) {
            console.error('Failed to assign technician', error);
            alert('Failed to assign technician');
        }
    };

    const handleAddDiagnosis = async () => {
        await addDiagnosis(id, diagnosis);
        loadTicket();
    };

    const handleCreateQuote = async () => {
        const total = quoteItems.reduce((sum, item) => sum + Number(item.price), 0);
        await createQuote(id, quoteItems, total);
        loadTicket();
    };

    const handleApproveQuote = async (quoteId: number) => {
        await updateQuoteStatus(id, quoteId, 'APPROVED');
        loadTicket();
    };

    const handleCompleteRepair = async () => {
        await completeRepair(id);
        loadTicket();
    };

    if (loading) return <div>Loading...</div>;
    if (!ticket) return <div>Ticket not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Ticket #{ticket.ticket_ref}</h1>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                    {ticket.status}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Ticket Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-500 block">Customer</label>
                                <p className="font-medium text-gray-900">{ticket.customer?.name}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 block">Equipment</label>
                                <p className="font-medium text-gray-900">{ticket.equipment?.name}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 block">Assigned Technician</label>
                                <div className="flex gap-2 mt-1">
                                    <select
                                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border text-sm"
                                        value={selectedTech}
                                        onChange={(e) => setSelectedTech(e.target.value)}
                                    >
                                        <option value="">Unassigned</option>
                                        {technicians.map((tech) => (
                                            <option key={tech.id} value={tech.id}>
                                                {tech.full_name} ({tech.role})
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={handleAssignTech}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Assign
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-500 block">Issue Description</label>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded border">{ticket.issue_description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Workflow */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Workflow Progress</h2>

                    {/* Diagnosis Step */}
                    <div className={`bg-white shadow rounded-lg p-6 border-l-4 ${ticket.status === 'Open' ? 'border-blue-500' : 'border-green-500'}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">1. Diagnosis</h3>
                            {ticket.status !== 'Open' && <span className="text-green-600 font-medium">✓ Completed</span>}
                        </div>
                        {ticket.status === 'Open' ? (
                            <div className="mt-2">
                                <textarea
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 border"
                                    rows={4}
                                    placeholder="Enter detailed diagnosis results..."
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                />
                                <button
                                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors shadow-sm"
                                    onClick={handleAddDiagnosis}
                                >
                                    Submit Diagnosis
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-600 italic">Diagnosis submitted.</p>
                        )}
                    </div>

                    {/* Quote Step */}
                    <div className={`bg-white shadow rounded-lg p-6 border-l-4 ${ticket.status === 'Diagnosed' ? 'border-blue-500' : (ticket.quotes?.length ?? 0) > 0 ? 'border-green-500' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">2. Quote Generation</h3>
                            {(ticket.quotes?.length ?? 0) > 0 && <span className="text-green-600 font-medium">✓ Generated</span>}
                        </div>
                        {ticket.status === 'Diagnosed' ? (
                            <div className="mt-2 space-y-4">
                                {quoteItems.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <input
                                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                                            placeholder="Item Description"
                                            value={item.description}
                                            onChange={(e) => {
                                                const newItems = [...quoteItems];
                                                newItems[index].description = e.target.value;
                                                setQuoteItems(newItems);
                                            }}
                                        />
                                        <div className="relative w-32">
                                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                                            <input
                                                className="w-full pl-6 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                                                type="number"
                                                placeholder="0.00"
                                                value={item.price}
                                                onChange={(e) => {
                                                    const newItems = [...quoteItems];
                                                    newItems[index].price = parseFloat(e.target.value) || 0;
                                                    setQuoteItems(newItems);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors shadow-sm"
                                    onClick={handleCreateQuote}
                                >
                                    Generate Quote
                                </button>
                            </div>
                        ) : (ticket.quotes?.length ?? 0) > 0 ? (
                            <div className="bg-gray-50 p-4 rounded border">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">Status: <span className="text-blue-600">{ticket.quotes![0].status}</span></p>
                                    {ticket.quotes![0].status === 'DRAFT' && (
                                        <button
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                                            onClick={() => handleApproveQuote(ticket.quotes![0].id)}
                                        >
                                            Simulate Customer Approval
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-400">Waiting for diagnosis completion...</p>
                        )}
                    </div>

                    {/* Repair Step */}
                    <div className={`bg-white shadow rounded-lg p-6 border-l-4 ${ticket.status === 'In Progress' ? 'border-blue-500' : ticket.status === 'Resolved' ? 'border-green-500' : 'border-gray-200'}`}>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">3. Repair Execution</h3>
                        {ticket.status === 'In Progress' ? (
                            <div className="mt-2">
                                <div className="bg-blue-50 p-4 rounded border border-blue-100 mb-4 text-blue-800">
                                    Repair is currently in progress. Log parts used or complete the job.
                                </div>
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors shadow-sm"
                                    onClick={handleCompleteRepair}
                                >
                                    Complete Repair
                                </button>
                            </div>
                        ) : ticket.status === 'Resolved' ? (
                            <p className="text-green-600 font-medium">✓ Repair Completed</p>
                        ) : (
                            <p className="text-gray-400">Waiting for quote approval...</p>
                        )}
                    </div>

                    {/* Invoice Step */}
                    <div className={`bg-white shadow rounded-lg p-6 border-l-4 ${ticket.invoice ? 'border-green-500' : 'border-gray-200'}`}>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">4. Invoice</h3>
                        {ticket.invoice ? (
                            <div className="flex items-center justify-between bg-green-50 p-4 rounded border border-green-100">
                                <div>
                                    <p className="text-green-800 font-medium">Invoice Generated</p>
                                    <p className="text-green-600 text-sm">{ticket.invoice.invoice_ref}</p>
                                </div>
                                <button className="text-green-700 hover:text-green-900 font-medium">
                                    View Invoice →
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-400">Pending repair completion...</p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};
