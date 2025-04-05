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
  const [form, setForm] = useState<Omit<Entity, '_id'>>({ name: '', location: '', totalSqftAvailable: 0, pricePerSqft: 0 });

  const startEdit = (item: Entity) => {
    setEditing(item._id);
    const { _id, ...rest } = item;
    setForm(rest);
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', location: '', totalSqftAvailable: 0, pricePerSqft: 0 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'name' || name === 'location' ? value : +value }));
  };

  const handleUpdate = async () => {
    if (editing) {
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
        <div key={item._id} className="bg-white shadow-md p-6 rounded-md">
          {editing === item._id ? (
            <div className="grid sm:grid-cols-4 gap-2">
              <input name="name" value={form.name} onChange={handleChange} className="p-2 rounded border w-full" />
              <input name="location" value={form.location} onChange={handleChange} className="p-2 rounded border w-full" />
              <input name="totalSqftAvailable" type="number" value={form.totalSqftAvailable} onChange={handleChange} className="p-2 rounded border w-full" />
              <input name="pricePerSqft" type="number" value={form.pricePerSqft} onChange={handleChange} className="p-2 rounded border w-full" />
              <div className="col-span-full flex gap-2">
                <button onClick={handleUpdate} className="btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Save</button>
                <button onClick={cancelEdit} className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">📍 {item.location}</p>
                <p>Total Sqft: {item.totalSqftAvailable}</p>
                <p>💰 ₹{item.pricePerSqft} / Sqft</p>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <button onClick={() => startEdit(item)} className="btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="btn bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
