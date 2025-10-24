import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
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
        <header className="bg-white border-b p-4">
          <h1 className="font-semibold">Admin</h1>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
