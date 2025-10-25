import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../utils/api";

export default function AdminGenres() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const load = () => {
    setLoading(true);
    api.get("/api/genres")
      .then(res => setItems(Array.isArray(res.data) ? res.data : res.data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus genre ini?")) return;
    try {
      await api.delete(`/api/genres/${id}`);
      load(); // refresh list
    } catch (e) {
      console.error(e?.response?.data || e.message);
      alert("Gagal menghapus genre.");
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Genres</h2>
        <Link to="/admin/genres/create" className="px-4 py-2 rounded bg-indigo-600 text-white">+ Add Genre</Link>
      </div>

      {loading ? "Loading..." : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Slug</th>
              <th className="px-3 py-2 text-left w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((g,i)=>(
              <tr key={g.id ?? i} className="border-t">
                <td className="px-3 py-2">{i+1}</td>
                <td className="px-3 py-2">{g.name}</td>
                <td className="px-3 py-2">{g.slug}</td>
                <td className="px-3 py-2 space-x-2">
                  <Link to={`/admin/genres/${g.id}/edit`} className="px-3 py-1 rounded bg-amber-500 text-white">Edit</Link>
                  <button onClick={()=>handleDelete(g.id)} className="px-3 py-1 rounded bg-rose-600 text-white">Delete</button>
                </td>
              </tr>
            ))}
            {items.length===0 && <tr><td colSpan={4} className="px-3 py-4 text-gray-500">No data</td></tr>}
          </tbody>
        </table>
      )}
    </section>
  );
}
