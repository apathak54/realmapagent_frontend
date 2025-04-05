import { useEffect, useState } from "react";
import axios from "axios";

interface EntityA {
  _id?: string;
  location: string;
  totalSqftAvailable: number;
  pricePerSqft: number;
}

function App() {
  const [data, setData] = useState<EntityA[]>([]);
  const [form, setForm] = useState<EntityA>({
    location: "",
    totalSqftAvailable: 0,
    pricePerSqft: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/entitya")
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "location" ? value : Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location) return;
    try {
      await axios.post("http://localhost:5000/api/entitya", form);
      setForm({ location: "", totalSqftAvailable: 0, pricePerSqft: 0 });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Entity A Listings</h1>

      {/* Input form styled like a chat input */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="p-2 rounded border w-full md:w-1/3"
          />
          <input
            type="number"
            name="totalSqftAvailable"
            value={form.totalSqftAvailable || ""}
            onChange={handleChange}
            placeholder="Total sqft"
            className="p-2 rounded border w-full md:w-1/4"
          />
          <input
            type="number"
            name="pricePerSqft"
            value={form.pricePerSqft || ""}
            onChange={handleChange}
            placeholder="Price per sqft"
            className="p-2 rounded border w-full md:w-1/4"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>

      {/* Rendered entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{item.location}</h2>
            <p>Total Sqft Available: {item.totalSqftAvailable}</p>
            <p>Price per Sqft: ₹{item.pricePerSqft}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
