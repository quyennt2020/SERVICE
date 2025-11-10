import { useState, useEffect } from 'react';
import { useDashboardStore } from '../../stores/dashboard.store';
import { api } from '../../api';

const priorities = ['LOW', 'MEDIUM', 'HIGH'];
const statuses = ['NEW', 'DIAGNOSING', 'AWAITING_APPROVAL', 'PARTS_ORDERED', 'REPAIRING', 'TESTING', 'READY_FOR_INVOICING'];

export default function AdvancedFilter() {
  const { setFilters } = useDashboardStore();
  const [technicians, setTechnicians] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const techResponse = await api.get('/users?role=TECHNICIAN');
        setTechnicians(techResponse.data);
        const custResponse = await api.get('/customers');
        setCustomers(custResponse.data);
      } catch (error) {
        console.error('Failed to fetch filter data', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilters({
        technicianId: selectedTechs,
        customerId: selectedCustomers,
        status: selectedStatuses,
        priority: selectedPriorities,
    })
  }, [selectedTechs, selectedCustomers, selectedStatuses, selectedPriorities, setFilters]);

  const handleMultiSelectChange = (setter) => (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setter(selectedOptions);
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-bold mb-2">Filters</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select id="status" multiple onChange={handleMultiSelectChange(setSelectedStatuses)} className="mt-1 block w-full border-gray-300 rounded-md">
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
          <select id="priority" multiple onChange={handleMultiSelectChange(setSelectedPriorities)} className="mt-1 block w-full border-gray-300 rounded-md">
            {priorities.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="technician" className="block text-sm font-medium text-gray-700">Technician</label>
          <select id="technician" multiple onChange={handleMultiSelectChange(setSelectedTechs)} className="mt-1 block w-full border-gray-300 rounded-md">
            {technicians.map(tech => <option key={tech.id} value={tech.id}>{tech.full_name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
          <select id="customer" multiple onChange={handleMultiSelectChange(setSelectedCustomers)} className="mt-1 block w-full border-gray-300 rounded-md">
            {customers.map(cust => <option key={cust.id} value={cust.id}>{cust.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
