// booksales-frontend/src/assets/layouts/user.jsx
import { Link, Outlet } from "react-router-dom";
import { getUser, clearAuth } from "/src/utils/auth";

export default function UserLayout() {
  const user = getUser();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="font-semibold">BookSales</Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">Hi, {user?.name || "User"}</span>
            <Link className="px-3 py-1.5 rounded bg-gray-100" to="/books">Books</Link>
            <button
              onClick={() => { clearAuth(); location.href = "/login"; }}
              className="px-3 py-1.5 rounded bg-rose-600 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
