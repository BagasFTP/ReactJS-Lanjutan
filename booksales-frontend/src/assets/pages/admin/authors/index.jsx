import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../utils/api";

export default function AdminAuthors() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/api/authors")
      .then(res => setItems(Array.isArray(res.data) ? res.data : res.data.data || res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus author ini?")) return;
    try {
      await api.delete(`/api/authors/${id}`);
      load();
    } catch (e) {
      console.error(e?.response?.data || e.message);
      alert("Gagal menghapus author.");
    }
  };

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
              <th className="px-3 py-2 text-left w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a,i)=>(
              <tr key={a.id ?? i} className="border-t">
                <td className="px-3 py-2">{i+1}</td>
                <td className="px-3 py-2">{a.name}</td>
                <td className="px-3 py-2">{a.country ?? "-"}</td>
                <td className="px-3 py-2">{a.birth_year ?? "-"}</td>
                <td className="px-3 py-2 space-x-2">
                  <Link to={`/admin/authors/${a.id}/edit`} className="px-3 py-1 rounded bg-amber-500 text-white">Edit</Link>
                  <button onClick={()=>handleDelete(a.id)} className="px-3 py-1 rounded bg-rose-600 text-white">Delete</button>
                </td>
              </tr>
            ))}
            {items.length===0 && <tr><td colSpan={5} className="px-3 py-4 text-gray-500">No data</td></tr>}
          </tbody>
        </table>
      )}
    </section>
  );
}
