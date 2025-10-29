import { useEffect, useState } from "react";
import api from "../../../../utils/api";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/books")
      .then((res) => setBooks(res.data || []))
      .catch(() => console.error("Gagal memuat data buku"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Memuat buku terlaris...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          📚 Buku Terlaris Minggu Ini
        </h1>

        {books.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada buku yang tersedia.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.map((buku) => (
              <div
                key={buku.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                <img
                  src={
                    buku.cover_url ||
                    "https://images.unsplash.com/photo-1512820790803-83ca734da794"
                  }
                  alt={buku.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="font-semibold text-lg text-gray-800 line-clamp-2">
                    {buku.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 mb-3">
                    {buku.author?.name || "Anonim"} <br />
                    <span className="text-xs text-gray-400 italic">
                      {buku.genre?.name || "Tanpa Genre"}
                    </span>
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold text-indigo-600">
                      Rp{buku.price ? buku.price.toLocaleString() : "—"}
                    </p>
                    <Link
                      to={`/books/${buku.id}`}
                      className="inline-block mt-2 bg-indigo-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Detail Buku
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
