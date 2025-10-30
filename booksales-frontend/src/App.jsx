// booksales-frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import PublicLayout from "/src/assets/layouts/public";
import AdminLayout from "/src/assets/layouts/admin";
import UserLayout from "/src/assets/layouts/user";

/* Guards */
import RequireRole from "/src/assets/components/guards/RequireRole";

/* Public pages */
import Home from "/src/assets/pages/public";
import Books from "/src/assets/pages/public/books";
import ShowBook from "/src/assets/pages/public/books/show";
import Login from "/src/assets/pages/auth/login";
import Register from "/src/assets/pages/auth/register";

/* Admin pages */
import AdminDashboard from "/src/assets/pages/admin/index";
import AdminBooks from "/src/assets/pages/admin/books/index";
import BookCreate from "/src/assets/pages/admin/books/create";
import AdminAuthors from "/src/assets/pages/admin/authors/index";
import AuthorCreate from "/src/assets/pages/admin/authors/create";
import AuthorEdit from "/src/assets/pages/admin/authors/edit";
import AdminGenres from "/src/assets/pages/admin/genres/index";
import GenreCreate from "/src/assets/pages/admin/genres/create";
import GenreEdit from "/src/assets/pages/admin/genres/edit";
// Jika transaction folder berisi index.jsx, pakai path berikut:
import AdminTransactions from "/src/assets/pages/admin/transaction/index";

/* User pages */
import UserDashboard from "/src/assets/pages/user/dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<ShowBook />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin area (role: admin) */}
        <Route element={<RequireRole allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="books/create" element={<BookCreate />} />
            <Route path="authors" element={<AdminAuthors />} />
            <Route path="authors/create" element={<AuthorCreate />} />
            <Route path="authors/:id/edit" element={<AuthorEdit />} />
            <Route path="genres" element={<AdminGenres />} />
            <Route path="genres/create" element={<GenreCreate />} />
            <Route path="genres/:id/edit" element={<GenreEdit />} />
            <Route path="transactions" element={<AdminTransactions />} />
          </Route>
        </Route>

        {/* User area (role: user) */}
        <Route element={<RequireRole allowedRoles={["user"]} />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
