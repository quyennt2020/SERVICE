import { useState } from 'react';
import TicketList from '../components/TicketList';
import NewTicketModal from '../components/NewTicketModal';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setIsModalOpen(true)}>Create New Ticket</button>
      <TicketList />
      <NewTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
