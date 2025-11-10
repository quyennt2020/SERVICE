import { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import AdvancedFilter from '../components/dashboard/AdvancedFilter';
import TicketList from '../components/dashboard/TicketList';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import QuickActions from '../components/dashboard/QuickActions';
import { api } from '../api';

interface KpiData {
  pendingApproval: number;
  inProgress: number;
  pendingParts: number;
  awaitingPayment: number;
}

export default function DashboardPage() {
  const [kpiData, setKpiData] = useState<KpiData | null>(null);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await api.get('/dashboard/kpi');
        setKpiData(response.data);
      } catch (error) {
        console.error('Failed to fetch KPIs', error);
      }
    };
    fetchKpis();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Pending Approval" value={kpiData?.pendingApproval ?? 0} />
            <StatCard title="In Progress" value={kpiData?.inProgress ?? 0} />
            <StatCard title="Pending Parts" value={kpiData?.pendingParts ?? 0} />
            <StatCard title="Awaiting Payment" value={kpiData?.awaitingPayment ?? 0} />
          </div>
          <div>
            <AdvancedFilter />
            <div className="mt-4">
              <TicketList />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
