import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const createTicket = async (newTicket) => {
  const { data } = await axios.post('/api/tickets', newTicket);
  return data;
};

export default function NewTicketModal({ isOpen, onClose }: NewTicketModalProps) {
  const queryClient = useQueryClient();
  const [customerId, setCustomerId] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  const mutation = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      // Invalidate and refetch the tickets query
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      onClose(); // Close modal on success
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      customer_id: parseInt(customerId),
      equipment_id: parseInt(equipmentId),
      issue_description: description,
      priority,
      status: 'NEW',
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '2rem' }}>
        <h2>Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Customer ID</label>
            <input type="number" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
          </div>
          <div>
            <label>Equipment ID</label>
            <input type="number" value={equipmentId} onChange={(e) => setEquipmentId(e.target.value)} required />
          </div>
          <div>
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Creating...' : 'Create Ticket'}
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
          {mutation.isError && <p style={{ color: 'red' }}>An error occurred: {mutation.error.message}</p>}
        </form>
      </div>
    </div>
  );
}
