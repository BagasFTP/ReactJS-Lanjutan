import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { saveAuth } from "../../../utils/auth";

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v || "");
const min = (v, n) => (v || "").trim().length >= n;

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setErrors((s) => ({ ...s, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!min(form.name, 3)) e.name = "Nama minimal 3 karakter.";
    if (!emailOk(form.email)) e.email = "Format email tidak valid.";
    if (!min(form.username, 3)) e.username = "Username minimal 3 karakter.";
    // pilih salah satu: 6 atau 8. Di sini konsisten 6:
    if (!min(form.password, 6)) e.password = "Password minimal 6 karakter.";
    if (!form.agree) e.agree = "Wajib menyetujui ketentuan.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password,
      };

      // NOTE: jika baseURL utils/api sudah /api, pakai "/register"
      // kalau baseURL masih root (tanpa /api), ganti jadi "/api/register"
      try {
        const withUsername = await api.post("/register", {
          ...payload,
          username: form.username,
        });
        handleSuccess(withUsername.data);
        return;
      } catch (e) {
        if (e?.response?.status !== 422) throw e;
        const withoutUsername = await api.post("/register", payload);
        handleSuccess(withoutUsername.data);
        return;
      }
    } catch (err) {
      const res = err?.response;
      if (res?.status === 422 && res?.data?.errors) {
        const be = {};
        Object.entries(res.data.errors).forEach(
          ([k, v]) => (be[k] = v?.[0] || "Invalid")
        );
        setErrors((s) => ({ ...s, ...be }));
      } else {
        alert(res?.data?.message || err.message || "Registrasi gagal.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccess = (data) => {
    // Ekspektasi respons: { user: {...}, token: "..." }
    const user = data?.user;
    const token = data?.token;

    if (token && user) {
      // simpan agar interceptor axios otomatis kirim Authorization
      saveAuth({ user, token });
      // kalau ada role admin → ke /admin, kalau tidak → ke /
      if (user.role === "admin") nav("/admin");
      else nav("/");
    } else {
      // kalau register tidak auto-login, arahkan ke login
      nav("/login");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
          <p className="text-sm text-gray-500 mb-6">
            Daftar untuk mengakses Admin Panel BookSales.
          </p>

          <form onSubmit={submit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                className={`w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 ${
                  errors.name ? "border-rose-500 focus:ring-rose-400" : "border-gray-300 focus:ring-indigo-300"
                }`}
                name="name"
                placeholder="cth: Bagas Firdaus"
                value={form.name}
                onChange={onChange}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
            </div>

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

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                className={`w-full rounded-lg border p-2.5 focus:outline-none focus:ring-2 ${
                  errors.username ? "border-rose-500 focus:ring-rose-400" : "border-gray-300 focus:ring-indigo-300"
                }`}
                name="username"
                placeholder="cth: bagasfp"
                value={form.username}
                onChange={onChange}
              />
              {errors.username && <p className="mt-1 text-xs text-rose-600">{errors.username}</p>}
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
                placeholder="min. 6 karakter"
                value={form.password}
                onChange={onChange}
              />
              {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={form.agree}
                onChange={onChange}
                className={`mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
                  errors.agree ? "ring-2 ring-rose-400" : ""
                }`}
              />
              <label htmlFor="agree" className="text-sm text-gray-700 select-none">
                Saya menyetujui <span className="text-indigo-600">Syarat & Ketentuan</span>.
              </label>
            </div>
            {errors.agree && <p className="mt-1 text-xs text-rose-600">{errors.agree}</p>}

            {/* Submit */}
            <button
              disabled={submitting}
              className="w-full rounded-lg bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {submitting ? "Processing..." : "Create account"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Masuk
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
