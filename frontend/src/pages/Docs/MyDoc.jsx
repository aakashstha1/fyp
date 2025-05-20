import { useEffect, useState } from "react";
import axios from "axios";
import { CreateDocCard, DocCard } from "./DocCard";

const API_URL = "http://localhost:8000/api";

export default function MyDoc() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get(`${API_URL}/doc/my-docs`, {
          withCredentials: true, // send JWT cookie
        });
        setDocs(res.data.docs);
      } catch (err) {
        console.error("Error fetching docs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 p-4">
      <CreateDocCard />
      {docs.map((doc) => (
        <DocCard key={doc._id} {...doc} id={doc._id} />
      ))}
    </div>
  );
}
