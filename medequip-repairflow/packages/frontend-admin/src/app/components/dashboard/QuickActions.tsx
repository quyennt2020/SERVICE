import { useState } from 'react';
import NewTicketModal from './NewTicketModal';

export default function QuickActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold mb-2">Quick Actions</h3>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create New Ticket
          </button>
          {/* Navigation links will be added here */}
        </div>
      </div>
      <NewTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
