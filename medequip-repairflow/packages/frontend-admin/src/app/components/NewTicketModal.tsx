import { useState } from 'react';
import styles from './NewTicketModal.module.css';

export default function NewTicketModal({ onClose, onSubmit }) {
  const [customerId, setCustomerId] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ customerId, equipmentId, problemDescription });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="customer">Customer</label>
            <input
              id="customer"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="equipment">Equipment</label>
            <input
              id="equipment"
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="problem">Problem Description</label>
            <textarea
              id="problem"
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Ticket</button>
        </form>
      </div>
    </div>
  );
}
