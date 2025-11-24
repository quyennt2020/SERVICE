import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '../api';

interface TicketListProps {
  techId?: number;
}

export default function TicketList({ techId }: TicketListProps) {
  const navigate = useNavigate();
  const { data: tickets, error, isLoading } = useQuery({
    queryKey: ['tickets', techId],
    queryFn: () => fetchTickets(techId),
  });

  if (isLoading) return <div className="p-6 text-center text-gray-500">Loading tickets...</div>;
  if (error) return <div className="p-6 text-center text-red-500">An error occurred: {error.message}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Equipment
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Priority
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket: any) => (
            <tr
              key={ticket.id}
              onClick={() => navigate(`/tickets/${ticket.id}`)}
              className="hover:bg-gray-50 cursor-pointer transition duration-150"
            >
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap font-medium">{ticket.ticket_ref}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{ticket.customer?.name}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{ticket.equipment?.serial_number}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${ticket.status === 'Open' ? 'text-green-900' :
                  ticket.status === 'In Progress' ? 'text-blue-900' :
                    'text-gray-900'
                  }`}>
                  <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${ticket.status === 'Open' ? 'bg-green-200' :
                    ticket.status === 'In Progress' ? 'bg-blue-200' :
                      'bg-gray-200'
                    }`}></span>
                  <span className="relative">{ticket.status}</span>
                </span>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                  ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                  {ticket.priority}
                </span>
              </td>
            </tr>
          ))}
          {tickets?.length === 0 && (
            <tr>
              <td colSpan={5} className="px-5 py-5 border-b border-gray-200 text-sm text-center text-gray-500">
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
