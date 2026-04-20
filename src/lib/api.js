import { getAccessToken, clearAuthTokens, isTokenExpired, getRefreshToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8087';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Handle API response and 401 errors
const handleResponse = async (response) => {
  if (response.status === 401) {
    // Token expired or invalid
    clearAuthTokens();
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `Error: ${response.status}`);
  }
  
  return response.json();
};

// GET request
export const get = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// POST request
export const post = async (endpoint, data) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// POST with FormData (for file uploads)
export const postFormData = async (endpoint, formData) => {
  const token = getAccessToken();
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  // Don't set Content-Type for FormData, browser sets it with boundary
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: formData,
  });
  return handleResponse(response);
};

// PUT request
export const put = async (endpoint, data) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// DELETE request
export const del = async (endpoint) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// Auth-specific APIs
export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
};

// Client APIs
export const getClients = async () => {
  return get('/api/v1/clients');
};

export const getClient = async (clientId) => {
  return get(`/api/v1/clients/${clientId}`);
};

export const createClient = async (clientData) => {
  return post('/api/v1/clients', clientData);
};

export const updateClient = async (clientId, clientData) => {
  return put(`/api/v1/clients/${clientId}`, clientData);
};

export const deleteClient = async (clientId) => {
  return del(`/api/v1/clients/${clientId}`);
};

export const uploadClientImage = async (clientId, type, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return postFormData(`/api/v1/images/clients/${clientId}/${type}`, formData);
};

// Public canvas data
export const getCanvasData = async (clientId) => {
  return get(`/tn/${clientId}/canvas-data`);
};

// Profile APIs
export const getProfile = async () => {
  return get('/api/v1/users/me');
};

export const changePassword = async (currentPassword, newPassword) => {
  return post('/api/v1/users/change-password', { current_password: currentPassword, new_password: newPassword });
};
