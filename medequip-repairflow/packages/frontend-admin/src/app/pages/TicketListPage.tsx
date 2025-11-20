import TicketList from '../components/TicketList';

export default function TicketListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">All Tickets</h1>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <TicketList />
      </div>
    </div>
  );
}
