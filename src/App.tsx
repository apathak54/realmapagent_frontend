import { useEffect, useState } from "react";
import axios from "axios";

interface EntityA {
  _id: string;
  location: string;
  totalSqftAvailable: number;
  pricePerSqft: number;
}

function App() {
  const [data, setData] = useState<EntityA[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/entitya")
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Entity A Listings</h1>
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
