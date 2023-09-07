import { useState, useEffect } from 'react';
import { Form } from './components/Form';
import { StatCard } from './components/StatCard';
import { useTokenStore } from './stores/useTokenStore';
import { getStats } from './services/stats';
import { type DataPoint, StatsTypes } from './lib/types';
import { Button } from './components/ui/Button';

import './globals.css';

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
  const [loading, setLoading] = useState(true);
  const token = useTokenStore((state) => state.token);
  const resetToken = useTokenStore((state) => state.resetToken);

  useEffect(() => {
    if (token) {
      (async () => {
        setLoading(true);
        try {
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
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [token]);

  return (
    <>
      <main className="min-h-screen grid place-content-center container">
        {token ? (
          <div className="p-4 grid gap-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              oktaaniTODO Statistics
            </h1>
            <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-3">
              <StatCard
                title="New Collections"
                description="Created in this month."
                unit="Collections"
                data={statsData.newCollection}
                loading={loading}
              />
              <StatCard
                title="New Items"
                description="Created in this month."
                unit="Items"
                data={statsData.newItem}
                loading={loading}
              />
              <StatCard
                title="Deleted Collections"
                description="Deleted in this month."
                unit="Collections"
                data={statsData.deleteCollection}
                loading={loading}
              />
              <StatCard
                title="Deleted Items"
                description="Deleted in this month."
                unit="Items"
                data={statsData.deleteItem}
                loading={loading}
              />
              <StatCard
                title="Shared Collections"
                description="Shared in this month."
                unit="Collections"
                data={statsData.shareCollection}
                loading={loading}
              />
            </div>
            <Button onClick={resetToken}>Logout</Button>
          </div>
        ) : (
          <Form />
        )}
      </main>
    </>
  );
}

export default App;
