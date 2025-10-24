import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";

export default function GenreCreate() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/api/genres", { name, slug: slug || undefined });
      alert("Genre created");
      nav("/admin/genres");
    } catch (err) {
      console.error(err?.response?.data || err.message);
      alert("Gagal membuat genre");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-xl">
      <h2 className="text-xl font-bold mb-4">Create Genre</h2>
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
