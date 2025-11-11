import { useState, useEffect } from 'react';
import { apiClient as api } from '../../api';

export default function SystemSettingsTab() {
  const [settings, setSettings] = useState({
    company_name: '',
    company_address: '',
    company_tax_id: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Failed to fetch settings', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch('/settings', settings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Failed to update settings', error);
      alert('Failed to update settings.');
    }
  };

  if (isLoading) return <p>Loading settings...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label>Company Name</label>
        <input name="company_name" value={settings.company_name || ''} onChange={handleInputChange} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label>Company Address</label>
        <textarea name="company_address" value={settings.company_address || ''} onChange={handleInputChange} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label>Company Tax ID</label>
        <input name="company_tax_id" value={settings.company_tax_id || ''} onChange={handleInputChange} className="w-full border p-2 rounded" />
      </div>
      <div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </div>
    </form>
  );
}
