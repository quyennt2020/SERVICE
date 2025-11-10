import { create } from 'zustand';

interface DashboardFilters {
  status: string[];
  priority: string[];
  technicianId: string[];
  customerId: string[];
}

interface DashboardState {
  filters: DashboardFilters;
  setFilters: (newFilters: Partial<DashboardFilters>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  filters: {
    status: [],
    priority: [],
    technicianId: [],
    customerId: [],
  },
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));
