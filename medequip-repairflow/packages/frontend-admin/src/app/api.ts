import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // This will be proxied by Vite to the backend
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTickets = async () => {
  const { data } = await apiClient.get('/tickets');
  return data;
};

export const updateTicketStatus = async ({ id, status }) => {
  const { data } = await apiClient.patch(`/tickets/${id}/status`, { status });
  return data;
};
