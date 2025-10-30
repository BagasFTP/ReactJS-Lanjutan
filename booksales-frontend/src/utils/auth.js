// booksales-frontend/src/utils/auth.js

// Simpan { user, token } ke localStorage
export function saveAuth({ user, token }) {
  localStorage.setItem("auth", JSON.stringify({ user, token }));
}

// Ambil objek auth mentah
export function getAuth() {
  const raw = localStorage.getItem("auth");
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

// Ambil user aktif
export function getUser() {
  const auth = getAuth();
  return auth?.user || null;
}

// Ambil role user
export function getRole() {
  const user = getUser();
  return user?.role || null;
}

// Sudah login?
export function isAuthenticated() {
  const auth = getAuth();
  return !!auth?.token;
}

// Punya salah satu role?
export function hasRole(...roles) {
  const role = getRole();
  return !!role && roles.includes(role);
}

// Hapus auth (logout)
export function clearAuth() {
  localStorage.removeItem("auth");
}
