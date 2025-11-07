import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '../api';

export default function TicketList() {
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
            <tr key={ticket.id}>
              <td>{ticket.ticket_ref}</td>
              <td>{ticket.customer?.name}</td>
              <td>{ticket.equipment?.serial_number}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
