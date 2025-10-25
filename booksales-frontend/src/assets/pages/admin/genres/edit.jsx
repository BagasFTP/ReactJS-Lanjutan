import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";

export default function GenreEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/genres/${id}`)
      .then(res => {
        const g = res.data?.data || res.data; // backend-mu kadang bungkus data
        setName(g.name || "");
        setSlug(g.slug || "");
      })
      .finally(()=>setLoading(false));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/api/genres/${id}`, { name, slug: slug || null });
      alert("Genre updated");
      nav("/admin/genres");
    } catch (e) {
      console.error(e?.response?.data || e.message);
      alert("Gagal mengubah genre.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="max-w-xl">
      <h2 className="text-xl font-bold mb-4">Edit Genre</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full border rounded p-2" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Slug (optional)</label>
          <input className="w-full border rounded p-2" value={slug} onChange={e=>setSlug(e.target.value)} />
        </div>
        <button disabled={saving} className="px-4 py-2 rounded bg-indigo-600 text-white">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
