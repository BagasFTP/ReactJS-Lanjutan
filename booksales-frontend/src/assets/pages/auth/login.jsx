// booksales-frontend/src/assets/pages/auth/login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "/src/utils/api";
import { saveAuth, clearAuth } from "/src/utils/auth";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErr("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    // Pastikan token lama tidak mengganggu request login
    clearAuth();

    try {
      // NOTE: baseURL api sudah .../api, jadi endpoint cukup "/login"
      const res = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      const { user, token } = res.data || {};
      if (user && token) {
        saveAuth({ user, token });
        // Redirect berdasarkan role
        if (user.role === "admin") {
          nav("/admin", { replace: true });
        } else {
          nav("/dashboard", { replace: true });
        }
      } else {
        // fallback kalau backend tidak mengembalikan token/user
        nav("/", { replace: true });
      }
    } catch (e2) {
      const r = e2?.response;
      if (r?.status === 401) {
        setErr(r?.data?.message || "Email atau password salah.");
      } else if (r?.status === 422 && r?.data?.errors) {
        const msg = Object.values(r.data.errors)
          .map((v) => (Array.isArray(v) ? v[0] : v))
          .join(", ");
        setErr(msg || "Validasi gagal.");
      } else {
        setErr(r?.data?.message || e2.message || "Login gagal.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-1">Masuk</h1>
        <p className="text-sm text-gray-500 mb-6">
          Silakan login untuk mengakses aplikasi.
        </p>

        {err && (
          <div className="mb-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md p-2">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={onChange}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="text-xs text-indigo-600 hover:underline"
              >
                {showPwd ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>
            <input
              className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              name="password"
              type={showPwd ? "text" : "password"}
              placeholder="••••••"
              value={form.password}
              onChange={onChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Belum punya akun?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
