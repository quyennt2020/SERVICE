export default function NewTicketModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/3">
        <h2 className="text-lg font-bold mb-4">Create New Ticket</h2>
        <p>Ticket creation form will be here.</p>
        <button onClick={onClose} className="mt-4 bg-gray-300 px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}
