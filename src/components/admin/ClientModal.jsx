import { useState, useEffect } from 'react';
import { createClient, updateClient } from '../../lib/api';

const ClientModal = ({ client, onClose }) => {
  const [formData, setFormData] = useState({
    client_id: '',
    name: '',
    description: '',
    is_active: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!client;

  useEffect(() => {
    if (client) {
      setFormData({
        client_id: client.client_id,
        name: client.name,
        description: client.description || '',
        is_active: client.is_active !== false
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateClientId = (id) => {
    // URL-friendly validation: lowercase, numbers, hyphens only
    return /^[a-z0-9-]+$/.test(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.client_id.trim()) {
      setError('Client ID is required');
      return;
    }
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!validateClientId(formData.client_id)) {
      setError('Client ID must be lowercase, URL-friendly (letters, numbers, hyphens only)');
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing) {
        await updateClient(client.client_id, {
          name: formData.name,
          description: formData.description,
          is_active: formData.is_active
        });
      } else {
        await createClient({
          client_id: formData.client_id,
          name: formData.name,
          description: formData.description,
          is_active: formData.is_active
        });
      }
      onClose(true);
    } catch (err) {
      setError(err.message || 'Failed to save client');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            {isEditing ? 'Edit Client' : 'Create New Client'}
          </h2>
          <button
            onClick={() => onClose(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Client ID */}
            <div>
              <label htmlFor="client_id" className="block text-sm font-medium text-slate-700 mb-2">
                Client ID <span className="text-red-500">*</span>
                <span className="text-slate-400 font-normal ml-1">(URL-friendly, unique)</span>
              </label>
              <input
                id="client_id"
                name="client_id"
                type="text"
                value={formData.client_id}
                onChange={handleChange}
                disabled={isEditing}
                placeholder="e.g., client-name-123"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-500"
              />
              <p className="mt-1 text-xs text-slate-500">
                {isEditing 
                  ? 'Client ID cannot be changed after creation'
                  : 'Lowercase letters, numbers, and hyphens only. Example: "my-client"'
                }
              </p>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Display Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., My Client Name"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                Description <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the client..."
                rows={3}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
                Active (visible to public)
              </label>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isEditing ? 'Save Changes' : 'Create Client'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
