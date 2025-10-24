import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";

export default function AuthorCreate() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [saving, setSaving] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/api/authors", {
        name,
        country: country || undefined,
        birth_year: birthYear ? Number(birthYear) : undefined,
      });
      alert("Author created");
      nav("/admin/authors");
    } catch (err) {
      console.error(err?.response?.data || err.message);
      alert("Gagal membuat author. Cek console/Network.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-xl">
      <h2 className="text-xl font-bold mb-4">Create Author</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full border rounded p-2" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Country (optional)</label>
          <input className="w-full border rounded p-2" value={country} onChange={e=>setCountry(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Birth Year (optional)</label>
          <input type="number" className="w-full border rounded p-2" value={birthYear} onChange={e=>setBirthYear(e.target.value)} />
        </div>
        <button disabled={saving} className="px-4 py-2 rounded bg-indigo-600 text-white">
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
