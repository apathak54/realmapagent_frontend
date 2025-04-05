import { useState } from 'react';
import { createEntity } from '../services/api';

interface Props {
  onSuccess: () => void;
}

export default function EntityForm({ onSuccess }: Props) {
  const [form, setForm] = useState({ name: '', location: '', totalSqftAvailable: 0, pricePerSqft: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'name' || name === 'location' ? value : +value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEntity(form);
    setForm({ name: '', location: '', totalSqftAvailable: 0, pricePerSqft: 0 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow flex flex-col gap-4 sm:flex-row sm:items-end mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} className="input p-2 rounded border w-full " placeholder="Name" required />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input type="text" name="location" value={form.location} onChange={handleChange} className="input p-2 rounded border w-full " placeholder="Location" required />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Total Sqft</label>
        <input type="number" name="totalSqftAvailable" value={form.totalSqftAvailable} onChange={handleChange} className="input p-2 rounded border w-full" placeholder="Total Sqft" required />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Price/Sqft</label>
        <input type="number" name="pricePerSqft" value={form.pricePerSqft} onChange={handleChange} className="input p-2 rounded border w-full " placeholder="Price/Sqft" required />
      </div>
      <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 sm:mt-0">Add</button>
    </form>
  );
}