import { useState } from 'react';

export default function EquipmentFilterBar({ onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleApplyFilters = () => {
    onFilterChange({ searchQuery });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    onFilterChange({});
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg mb-4 flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search by Serial Number or Model..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-md p-2 flex-grow"
      />
      {/* Placeholder for future filters like customer or manufacturer */}
      <button onClick={handleApplyFilters} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Apply
      </button>
      <button onClick={handleClearFilters} className="bg-gray-300 px-4 py-2 rounded-md">
        Clear
      </button>
    </div>
  );
}
