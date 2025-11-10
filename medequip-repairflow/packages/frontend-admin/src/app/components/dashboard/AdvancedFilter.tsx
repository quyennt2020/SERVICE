import { useDashboardStore } from '../../stores/dashboard.store';

export default function AdvancedFilter() {
  const { filters, setFilters } = useDashboardStore();

  const handleStatusChange = (e) => {
    // In a real app, this would handle multi-select
    setFilters({ status: [e.target.value] });
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-bold mb-2">Filters</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select id="status" onChange={handleStatusChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="">All</option>
            <option value="AWAITING_APPROVAL">Awaiting Approval</option>
            <option value="REPAIRING">Repairing</option>
            <option value="PARTS_ORDERED">Parts Ordered</option>
          </select>
        </div>
        {/* Add other filters for priority, technician, customer here */}
      </div>
    </div>
  );
}
