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

export const fetchTickets = async (techId?: number) => {
  const params = techId ? { techId } : {};
  const { data } = await apiClient.get('/tickets', { params });
  return data;
};

export const fetchCustomers = async () => {
  const { data } = await apiClient.get('/customers');
  return data;
};

export const fetchCustomer = async (id: number) => {
  const { data } = await apiClient.get(`/customers/${id}`);
  return data;
};

export const createCustomer = async (customerData: any) => {
  const { data } = await apiClient.post('/customers', customerData);
  return data;
};

export const updateCustomer = async (id: number, customerData: any) => {
  const { data } = await apiClient.patch(`/customers/${id}`, customerData);
  return data;
};

export const deleteCustomer = async (id: number) => {
  const { data } = await apiClient.delete(`/customers/${id}`);
  return data;
};

// Customer 360° View APIs
export const fetchCustomerEquipment = async (customerId: number) => {
  const { data } = await apiClient.get(`/customers/${customerId}/equipment`);
  return data;
};

export const fetchCustomerTickets = async (customerId: number) => {
  const { data } = await apiClient.get(`/customers/${customerId}/tickets`);
  return data;
};

export const fetchCustomerContacts = async (customerId: number) => {
  const { data } = await apiClient.get(`/customers/${customerId}/contacts`);
  return data;
};

export const fetchCustomerStats = async (customerId: number) => {
  const { data } = await apiClient.get(`/customers/${customerId}/stats`);
  return data;
};

export const fetchCustomerInvoices = async (customerId: number) => {
  const { data } = await apiClient.get(`/invoices/customer/${customerId}`);
  return data;
};

// Invoices
export const fetchInvoices = async () => {
  const { data } = await apiClient.get('/invoices');
  return data;
};

export const fetchInvoice = async (id: number) => {
  const { data } = await apiClient.get(`/invoices/${id}`);
  return data;
};

export const createInvoice = async (invoiceData: any) => {
  const { data } = await apiClient.post('/invoices', invoiceData);
  return data;
};

export const updateInvoice = async (id: number, invoiceData: any) => {
  const { data } = await apiClient.patch(`/invoices/${id}`, invoiceData);
  return data;
};

export const recordPayment = async (id: number) => {
  const { data } = await apiClient.post(`/invoices/${id}/pay`);
  return data;
};

export const fetchEquipment = async () => {
  const { data } = await apiClient.get('/equipment');
  return data;
};

export const fetchEquipmentItem = async (id: number) => {
  const { data } = await apiClient.get(`/equipment/${id}`);
  return data;
};

export const createEquipment = async (equipmentData: any) => {
  const { data } = await apiClient.post('/equipment', equipmentData);
  return data;
};

export const updateEquipment = async (id: number, equipmentData: any) => {
  const { data } = await apiClient.patch(`/equipment/${id}`, equipmentData);
  return data;
};

export const deleteEquipment = async (id: number) => {
  const { data } = await apiClient.delete(`/equipment/${id}`);
  return data;
};

// Users
export const fetchUsers = async () => {
  const { data } = await apiClient.get('/users');
  return data;
};

export const createUser = async (userData: any) => {
  const { data } = await apiClient.post('/users', userData);
  return data;
};

export const updateUser = async (id: number, userData: any) => {
  const { data } = await apiClient.patch(`/users/${id}`, userData);
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await apiClient.delete(`/users/${id}`);
  return data;
};

export const createTicket = async (ticketData: any) => {
  const { data } = await apiClient.post('/tickets', ticketData);
  return data;
};

export const fetchTicket = async (id: number) => {
  const { data } = await apiClient.get(`/tickets/${id}`);
  return data;
};

export const addDiagnosis = async (id: number, description: string) => {
  const { data } = await apiClient.post(`/tickets/${id}/diagnosis`, { description });
  return data;
};

export const createQuote = async (id: number, items: any[], total: number) => {
  const { data } = await apiClient.post(`/tickets/${id}/quote`, { items, total });
  return data;
};

export const updateQuoteStatus = async (id: number, quoteId: number, status: string) => {
  const { data } = await apiClient.patch(`/tickets/${id}/quote/${quoteId}/status`, { status });
  return data;
};

export const logPartUsage = async (id: number, partId: number, quantity: number, userId?: number) => {
  const { data } = await apiClient.post(`/tickets/${id}/parts`, { partId, quantity, userId });
  return data;
};

export const getTicketParts = async (id: number) => {
  const { data } = await apiClient.get(`/tickets/${id}/parts`);
  return data;
};

export const removePartUsage = async (ticketId: number, partUsedId: number, userId?: number) => {
  const { data } = await apiClient.delete(`/tickets/${ticketId}/parts/${partUsedId}`, { data: { userId } });
  return data;
};

export const completeRepair = async (id: number) => {
  const { data } = await apiClient.post(`/tickets/${id}/complete`);
  return data;
};

export const assignTicket = async (id: number, techId: number) => {
  const { data } = await apiClient.patch(`/tickets/${id}/assign`, { techId });
  return data;
};

// Parts/Inventory APIs
export const fetchParts = async () => {
  const { data } = await apiClient.get('/parts');
  return data;
};

export const fetchPart = async (id: number) => {
  const { data } = await apiClient.get(`/parts/${id}`);
  return data;
};

export const fetchLowStockParts = async () => {
  const { data } = await apiClient.get('/parts/low-stock');
  return data;
};

export const createPart = async (partData: any) => {
  const { data } = await apiClient.post('/parts', partData);
  return data;
};

export const updatePart = async (id: number, partData: any) => {
  const { data } = await apiClient.patch(`/parts/${id}`, partData);
  return data;
};

export const deletePart = async (id: number) => {
  const { data } = await apiClient.delete(`/parts/${id}`);
  return data;
};

export const adjustPartStock = async (
  id: number,
  quantity: number,
  reason: string,
  userId?: number
) => {
  const { data } = await apiClient.post(`/parts/${id}/adjust-stock`, {
    quantity,
    reason,
    userId,
  });
  return data;
};

export const fetchPartInventoryLogs = async (partId: number) => {
  const { data } = await apiClient.get(`/parts/${partId}/logs`);
  return data;
};

export const fetchAllInventoryLogs = async () => {
  const { data } = await apiClient.get('/parts/logs/all');
  return data;
};
