// booksales-frontend/src/assets/pages/admin/index.jsx
import { getUser } from "/src/utils/auth";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const user = getUser();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>
      <p className="text-gray-600">
        Selamat datang, <b>{user?.name || "Administrator"}</b>!
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/books" className="p-6 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700">📚 Kelola Buku</Link>
        <Link to="/admin/authors" className="p-6 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700">✍️ Kelola Penulis</Link>
        <Link to="/admin/genres" className="p-6 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700">🏷️ Kelola Genre</Link>
        <Link to="/admin/transactions" className="p-6 bg-gray-600 text-white rounded-xl shadow hover:bg-gray-700">💳 Transaksi</Link>
      </div>
    </section>
  );
}
