import { Outlet, Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../../utils/api";
import { useEffect } from "react";

export default function AdminLayout() {
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) nav("/public/login", { replace: true });
  }, [nav]);

  const logout = () => {
    // optional: panggil /api/logout kalau mau
    setAuthToken(null);
    nav("/public/login", { replace: true });
  };

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); } catch { return {}; }
  })();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 font-bold text-lg">Admin Panel</div>
        <nav className="space-y-1 px-2 pb-4">
          <Link to="/admin" className="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
          <Link to="/admin/books" className="block px-3 py-2 rounded hover:bg-gray-100">Books</Link>
          <Link to="/admin/authors" className="block px-3 py-2 rounded hover:bg-gray-100">Authors</Link>
          <Link to="/admin/genres" className="block px-3 py-2 rounded hover:bg-gray-100">Genres</Link>
          <Link to="/admin/transactions" className="block px-3 py-2 rounded hover:bg-gray-100">Transactions</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1">
        <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-semibold">Admin</h1>
            <p className="text-xs text-gray-500">{user?.email || "Logged in"}</p>
          </div>
          <button onClick={logout} className="px-3 py-2 rounded bg-rose-600 text-white hover:bg-rose-700">
            Logout
          </button>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
