import { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import { useDashboardStore } from '../../stores/dashboard.store';
import { api } from '../../api';

export default function TicketList() {
  const { filters, trigger } = useDashboardStore();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            value.forEach(v => params.append(key, v));
          }
        });

        const response = await api.get(`/dashboard/active-tickets?${params.toString()}`);
        setTickets(response.data);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [filters, trigger]);

  if (isLoading) {
    return <div>Loading tickets...</div>;
  }

  return (
    <div className="space-y-3">
      {tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
