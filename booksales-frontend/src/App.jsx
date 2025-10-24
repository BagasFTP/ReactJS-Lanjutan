import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import PublicLayout from "./assets/layouts/public";
import AdminLayout from "./assets/layouts/admin";

/* Public pages */
import Home from "./assets/pages/public";
import Books from "./assets/pages/public/books";
import ShowBook from "./assets/pages/public/books/show";
import Login from "./assets/pages/auth/login";
import Register from "./assets/pages/auth/register";

/* Admin pages */
import Dashboard from "./assets/pages";
import AdminBooks from "./assets/pages/admin/books";
import BookCreate from "./assets/pages/admin/books/create";
import AdminTransactions from "./assets/pages/admin/transaction";

/* Authors & Genres */
import AdminAuthors from "./assets/pages/admin/authors";
import AuthorCreate from "./assets/pages/admin/authors/create";
import AdminGenres from "./assets/pages/admin/genres";
import GenreCreate from "./assets/pages/admin/genres/create";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<ShowBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="books/create" element={<BookCreate />} />

          <Route path="authors" element={<AdminAuthors />} />
          <Route path="authors/create" element={<AuthorCreate />} />

          <Route path="genres" element={<AdminGenres />} />
          <Route path="genres/create" element={<GenreCreate />} />

          <Route path="transactions" element={<AdminTransactions />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
