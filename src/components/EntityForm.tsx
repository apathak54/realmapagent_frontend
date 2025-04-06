import { useState } from 'react';
import { createEntity } from '../services/api';

interface Props {
  onSuccess: () => void;
}

export default function EntityForm({ onSuccess }: Props) {
  const [form, setForm] = useState({ name: '', location: '', totalSqftAvailable: '', pricePerSqft: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'name' || name === 'location' ? value : +value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Destructure values from the form
    const { name, location, totalSqftAvailable, pricePerSqft } = form;
  
    // Calculate values before sending
    const totalPrice = parseFloat(totalSqftAvailable) * parseFloat(pricePerSqft);
    const threeYear = totalPrice / 36;
    const fiveYear = totalPrice / 60;
    const sevenYear = totalPrice / 84;
  
    // Create final object to send
    const dataToSave = {
      name,
      location,
      totalSqftAvailable:parseFloat(totalSqftAvailable),
      pricePerSqft:parseFloat(pricePerSqft),
      totalPrice,
      threeYear,
      fiveYear,
      sevenYear,
    };
  
    // Send to backend
    await createEntity(dataToSave);
  
    // Reset the form
    setForm({ name: '', location: '', totalSqftAvailable:'' , pricePerSqft: '' });
  
    // Trigger any post-submit behavior
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
        <input type="text" name="totalSqftAvailable" value={form.totalSqftAvailable } onChange={handleChange} className="input p-2 rounded border w-full"  placeholder="Total Sqft" required />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Price/Sqft</label>
        <input type="text" name="pricePerSqft" value={form.pricePerSqft} onChange={handleChange} className="input p-2 rounded border w-full " placeholder="Price/Sqft" required />
      </div>
      <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 sm:mt-0">Add</button>
    </form>
  );
}