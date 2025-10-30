import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { clearAuth } from "../../utils/auth";

export default function LogoutButton({ className = "" }) {
  const navigate = useNavigate();
  async function handleLogout() {
    try { await api.post("/logout"); } catch {}
    clearAuth();
    navigate("/login");
  }
  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
}
