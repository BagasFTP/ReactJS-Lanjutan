import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";

export default function AuthorEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/authors/${id}`)
      .then(res => {
        const a = res.data?.data || res.data;
        setName(a.name || "");
        setCountry(a.country || "");
        setBirthYear(a.birth_year || "");
      })
      .finally(()=>setLoading(false));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/api/authors/${id}`, {
        name,
        country: country || null,
        birth_year: birthYear ? Number(birthYear) : null,
      });
      alert("Author updated");
      nav("/admin/authors");
    } catch (e) {
      console.error(e?.response?.data || e.message);
      alert("Gagal mengubah author.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <section className="max-w-xl">
      <h2 className="text-xl font-bold mb-4">Edit Author</h2>
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
