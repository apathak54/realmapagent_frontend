import { useState } from 'react';
import { deleteEntity, updateEntity } from '../services/api';

interface Entity {
  _id: string;
  name: string;
  location: string;
  totalSqftAvailable: number;
  pricePerSqft: number;
}

export default function EntityList({ data, onRefresh }: { data: Entity[]; onRefresh: () => void }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Entity>>({});

  const startEdit = (item: Entity) => {
    setEditing(item._id);
    setForm(item);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'name' || name === 'location' ? value : +value }));
  };

  const handleUpdate = async () => {
    if (editing && form) {
      await updateEntity(editing, form);
      setEditing(null);
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteEntity(id);
    onRefresh();
  };

  return (
    <div className="grid gap-4">
      {data.map((item) => (
        <div key={item._id} className="bg-white shadow p-4 rounded">
          {editing === item._id ? (
            <div className="grid gap-2">
              <input name="name" value={form.name || ''} onChange={handleChange} className="input" />
              <input name="location" value={form.location || ''} onChange={handleChange} className="input" />
              <input name="totalSqftAvailable" type="number" value={form.totalSqftAvailable || 0} onChange={handleChange} className="input" />
              <input name="pricePerSqft" type="number" value={form.pricePerSqft || 0} onChange={handleChange} className="input" />
              <button onClick={handleUpdate} className="btn">Save</button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold">{item.name} - {item.location}</h2>
              <p>Total Sqft: {item.totalSqftAvailable}</p>
              <p>Price/Sqft: ₹{item.pricePerSqft}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => startEdit(item)} className="btn">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="btn bg-red-500 hover:bg-red-600">Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
