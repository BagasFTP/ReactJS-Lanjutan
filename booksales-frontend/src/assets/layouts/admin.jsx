// booksales-frontend/src/assets/layouts/admin.jsx
import { Link, Outlet } from "react-router-dom";
import { getUser, clearAuth } from "/src/utils/auth";

export default function AdminLayout() {
  const user = getUser();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/admin" className="font-semibold">Admin Panel</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/admin/books" className="px-2 py-1 rounded bg-gray-100">Books</Link>
            <Link to="/admin/authors" className="px-2 py-1 rounded bg-gray-100">Authors</Link>
            <Link to="/admin/genres" className="px-2 py-1 rounded bg-gray-100">Genres</Link>
            <Link to="/admin/transactions" className="px-2 py-1 rounded bg-gray-100">Transactions</Link>
            <span className="text-gray-600">Hi, {user?.name || "Admin"}</span>
            <button
              onClick={() => { clearAuth(); location.href = "/login"; }}
              className="px-3 py-1.5 rounded bg-rose-600 text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
