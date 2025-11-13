import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTicketStatus } from '../api';
import styles from './TicketDetailModal.module.css';

export default function TicketDetailModal({ ticket, onClose }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTicketStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      onClose();
    },
  });

  const handleStatusChange = (status) => {
    mutation.mutate({ id: ticket.id, status });
  };

  return (
    <div className={styles.modal} role="dialog">
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Ticket Details</h2>
        <p>
          <strong>ID:</strong> {ticket.ticket_ref}
        </p>
        <p>
          <strong>Customer:</strong> {ticket.customer?.name}
        </p>
        <p>
          <strong>Equipment:</strong> {ticket.equipment?.serial_number}
        </p>
        <p>
          <strong>Status:</strong> {ticket.status}
        </p>
        <p>
          <strong>Priority:</strong> {ticket.priority}
        </p>
        <div className={styles.actionButtons}>
          <h3>Change Status</h3>
          {ticket.status === 'Open' && (
            <button onClick={() => handleStatusChange('In Progress')}>
              Start Diagnosis
            </button>
          )}
          {ticket.status === 'In Progress' && (
            <>
              <button onClick={() => handleStatusChange('On Hold')}>
                On Hold
              </button>
              <button onClick={() => handleStatusChange('Resolved')}>
                Resolve
              </button>
            </>
          )}
          {ticket.status === 'On Hold' && (
            <button onClick={() => handleStatusChange('In Progress')}>
              Resume Diagnosis
            </button>
          )}
          {ticket.status === 'Resolved' && (
            <button onClick={() => handleStatusChange('Closed')}>
              Close Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
