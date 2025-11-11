import { useState, useEffect } from 'react';
import { apiClient as api } from '../../api';
import InviteUserModal from './InviteUserModal';

export default function UserManagementTab() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (user, newStatus) => {
    try {
      await api.patch(`/users/${user.id}/status`, { status: newStatus });
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error(`Failed to update status for ${user.email}`, error);
    }
  };

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Invite User
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.full_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {user.status === 'ACTIVE' ? (
                  <button onClick={() => handleStatusChange(user, 'INACTIVE')} className="text-red-600 hover:text-red-900">Deactivate</button>
                ) : (
                  <button onClick={() => handleStatusChange(user, 'ACTIVE')} className="text-green-600 hover:text-green-900">Activate</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <InviteUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInviteSent={fetchUsers}
      />
    </div>
  );
}
