import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../../../utils/api";

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v || "");

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!emailOk(form.email)) e.email = "Format email tidak valid.";
    if (!form.password) e.password = "Password wajib diisi.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await api.post("/api/login", {
        email: form.email,
        password: form.password,
      });

      // Banyak backend return { user, token } — cover beberapa variasi
      const token =
        res.data?.token ||
        res.data?.data?.token ||
        res.data?.access_token ||
        null;

      if (token) setAuthToken(token);
      // simpan sedikit data user kalau ada (opsional)
      if (res.data?.user) localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login berhasil!");
      nav("/admin", { replace: true });
    } catch (err) {
      const r = err?.response;
      if (r?.status === 422 && r?.data?.errors) {
        const be = {};
        Object.entries(r.data.errors).forEach(([k, v]) => (be[k] = v?.[0] || "Invalid"));
        setErrors(be);
      } else {
        alert(r?.data?.message || "Email atau password salah.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h1>
          <p className="text-sm text-gray-500 mb-6">
            Masuk untuk mengelola data di Admin Panel.
          </p>

          <form onSubmit={submit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                className={`w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 ${
                  errors.email ? "border-rose-500 focus:ring-rose-400" : "border-gray-300 focus:ring-indigo-300"
                }`}
                name="email"
                type="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={onChange}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <button
                  type="button"
                  className="text-xs text-indigo-600 hover:underline"
                  onClick={() => setShowPwd((s) => !s)}
                >
                  {showPwd ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
              <input
                className={`w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 ${
                  errors.password ? "border-rose-500 focus:ring-rose-400" : "border-gray-300 focus:ring-indigo-300"
                }`}
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="••••••"
                value={form.password}
                onChange={onChange}
              />
              {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              disabled={submitting}
              className="w-full rounded-lg bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Belum punya akun?{" "}
            <Link to="/public/register" className="text-indigo-600 hover:underline">
              Daftar
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} BookSales. All rights reserved.
        </p>
      </div>
    </div>
  );
}
