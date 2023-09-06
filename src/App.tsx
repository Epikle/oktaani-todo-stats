import { useState, useEffect } from 'react';
import { Form } from './components/Form';
import { StatCard } from './components/StatCard';
import { useTokenStore } from './stores/useTokenStore';
import { getStats } from './services/stats';
import { StatsTypes } from './lib/types';

import './globals.css';

interface DataPoint {
  point: number;
  fill?: string;
}

interface StatsData {
  newCollection: DataPoint[];
  newItem: DataPoint[];
  deleteCollection: DataPoint[];
  deleteItem: DataPoint[];
  shareCollection: DataPoint[];
}

const initialState: StatsData = {
  newCollection: [{ point: 0 }],
  newItem: [{ point: 0 }],
  deleteCollection: [{ point: 0 }],
  deleteItem: [{ point: 0 }],
  shareCollection: [{ point: 0 }],
};

function App() {
  const [statsData, setStatsData] = useState(initialState);
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    if (token) {
      (async () => {
        const [
          newCollection,
          newItem,
          deleteCollection,
          deleteItem,
          shareCollection,
        ] = await Promise.all([
          getStats(StatsTypes.newCollection, token),
          getStats(StatsTypes.newItem, token),
          getStats(StatsTypes.deleteCollection, token),
          getStats(StatsTypes.deleteItem, token),
          getStats(StatsTypes.shareCollection, token),
        ]);
        setStatsData({
          newCollection,
          newItem,
          deleteCollection,
          deleteItem,
          shareCollection,
        });
      })();
    }
  }, [token]);

  return (
    <>
      <main className="min-h-screen grid place-content-center">
        {token ? (
          <div className="flex gap-4">
            <StatCard
              title="New Collections"
              description="Created in this month."
              unit="Collections"
              data={statsData.newCollection}
            />
            <StatCard
              title="New Items"
              description="Created in this month."
              unit="Items"
              data={statsData.newItem}
            />
            <StatCard
              title="Deleted Collections"
              description="Deleted in this month."
              unit="Collections"
              data={statsData.deleteCollection}
            />
            <StatCard
              title="Deleted Items"
              description="Deleted in this month."
              unit="Items"
              data={statsData.deleteItem}
            />
            <StatCard
              title="Shared Collections"
              description="Shared in this month."
              unit="Collections"
              data={statsData.shareCollection}
            />
          </div>
        ) : (
          <Form />
        )}
      </main>
    </>
  );
}

export default App;
