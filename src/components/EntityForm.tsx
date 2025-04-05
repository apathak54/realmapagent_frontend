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
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-4">
      <input type="text" name="name" value={form.name} onChange={handleChange} className="input" placeholder="Name" required />
      <input type="text" name="location" value={form.location} onChange={handleChange} className="input" placeholder="Location" required />
      <input type="number" name="totalSqftAvailable" value={form.totalSqftAvailable} onChange={handleChange} className="input" placeholder="Total Sqft" required />
      <input type="number" name="pricePerSqft" value={form.pricePerSqft} onChange={handleChange} className="input" placeholder="Price/Sqft" required />
      <button type="submit" className="btn">Add</button>
    </form>
  );
}