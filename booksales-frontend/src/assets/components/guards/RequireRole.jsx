// booksales-frontend/src/assets/components/guards/RequireRole.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, hasRole } from "/src/utils/auth";

export default function RequireRole({ allowedRoles = [] }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (allowedRoles.length && !hasRole(...allowedRoles)) return <Navigate to="/" replace />;
  return <Outlet />;
}
