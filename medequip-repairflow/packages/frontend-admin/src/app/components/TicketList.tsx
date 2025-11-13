import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '../api';
import TicketDetailModal from './TicketDetailModal';

export default function TicketList() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { data: tickets, error, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
  });

  if (isLoading) return <div>Loading tickets...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2>Active Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Equipment</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket) => (
            <tr key={ticket.id} onClick={() => setSelectedTicket(ticket)}>
              <td>{ticket.ticket_ref}</td>
              <td>{ticket.customer?.name}</td>
              <td>{ticket.equipment?.serial_number}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
