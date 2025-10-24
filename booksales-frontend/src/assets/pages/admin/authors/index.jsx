import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../utils/api";

export default function AdminAuthors() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/authors")
      .then(res => setItems(Array.isArray(res.data) ? res.data : res.data.data || res.data || []))
      .catch(() => alert("Gagal memuat authors"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Authors</h2>
        <Link to="/admin/authors/create" className="px-4 py-2 rounded bg-indigo-600 text-white">+ Add Author</Link>
      </div>

      {loading ? "Loading..." : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Country</th>
              <th className="px-3 py-2 text-left">Birth Year</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a,i)=>(
              <tr key={a.id ?? i} className="border-t">
                <td className="px-3 py-2">{i+1}</td>
                <td className="px-3 py-2">{a.name}</td>
                <td className="px-3 py-2">{a.country ?? "-"}</td>
                <td className="px-3 py-2">{a.birth_year ?? "-"}</td>
              </tr>
            ))}
            {items.length===0 && (
              <tr><td colSpan={4} className="px-3 py-4 text-gray-500">No data</td></tr>
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
