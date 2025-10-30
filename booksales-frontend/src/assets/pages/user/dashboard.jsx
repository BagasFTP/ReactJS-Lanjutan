import { getUser } from "/src/utils/auth";

export default function UserDashboard() {
  const user = getUser();
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Selamat datang, <b>{user?.name || "User"}</b>!</p>
    </section>
  );
}
