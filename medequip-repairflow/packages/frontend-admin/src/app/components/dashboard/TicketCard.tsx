export default function TicketCard({ ticket }) {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`bg-white p-3 shadow rounded border-l-4 ${ticket.priority === 'HIGH' ? 'border-red-500' : 'border-blue-500'}`}>
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm">{ticket.ticket_ref}</span>
        <span className={`text-xs ${getPriorityClass(ticket.priority)} text-white px-2 py-1 rounded-full`}>
          {ticket.priority}
        </span>
      </div>
      <p className="font-semibold mt-2">{ticket.equipment?.name || 'N/A'}</p>
      <p className="text-sm text-gray-600">{ticket.customer?.name || 'N/A'}</p>
      <div className="text-xs text-gray-500 mt-2">
        <span>Status: </span>
        <span>{ticket.status}</span>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        <span>Assigned to: </span>
        <span>{ticket.assigned_to?.full_name || 'Unassigned'}</span>
      </div>
    </div>
  );
}
