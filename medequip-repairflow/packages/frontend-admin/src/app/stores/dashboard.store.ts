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
  refetchTickets: () => void; // A simple way to trigger a refetch
  trigger: number;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  filters: {
    status: [],
    priority: [],
    technicianId: [],
    customerId: [],
  },
  trigger: 0,
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  refetchTickets: () => set((state) => ({ trigger: state.trigger + 1 })),
}));
