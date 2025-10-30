import { Navigate, Outlet } from "react-router-dom";

function readAuth() {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem("auth");
    return null;
  }
}

export default function RequireAuth() {
  const auth = readAuth();
  if (!auth?.token) return <Navigate to="/login" replace />;
  return <Outlet />;
}
