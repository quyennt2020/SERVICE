import { useState } from 'react';
import { apiClient as api } from '../../api';

export default function InviteUserModal({ isOpen, onClose, onInviteSent }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('TECHNICIAN');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/invite', { email, role });
      onInviteSent();
      onClose();
    } catch (error) {
      console.error('Failed to send invitation', error);
      alert('Failed to send invitation.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
        <h2 className="text-lg font-bold mb-4">Invite New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2 rounded">
              <option value="TECHNICIAN">Technician</option>
              <option value="ACCOUNTANT">Accountant</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send Invitation</button>
          </div>
        </form>
      </div>
    </div>
  );
}
