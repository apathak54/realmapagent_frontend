import { useEffect, useState } from 'react';
import { fetchEntities } from './services/api';
import EntityForm from './components/EntityForm';
import EntityList from './components/EntityList';

export default function App() {
  const [data, setData] = useState([]);

  const loadData = () => {
    fetchEntities().then(res => setData(res.data.data));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Listings</h1>
      <EntityForm onSuccess={loadData} />
      <EntityList data={data} onRefresh={loadData} />
    </div>
  );
}