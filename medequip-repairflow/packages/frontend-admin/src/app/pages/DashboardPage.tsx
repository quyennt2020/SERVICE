import { useState } from 'react';
import TicketList from '../components/TicketList';
import CreateTicketModal from '../components/CreateTicketModal';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'all' | 'my'>('all');

  const techId = viewMode === 'my' && user ? user.id : undefined;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-4">
          {/* Toggle for My Tickets */}
          <div className="bg-gray-200 p-1 rounded-lg flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'all' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setViewMode('all')}
            >
              All Tickets
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'my' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setViewMode('my')}
            >
              My Tickets
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow transition duration-200 flex items-center"
          >
            <span className="mr-2">+</span> Create New Ticket
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {viewMode === 'my' ? 'My Assigned Tickets' : 'Recent Tickets'}
        </h2>
        <TicketList techId={techId} />
      </div>

      {isModalOpen && (
        <CreateTicketModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
