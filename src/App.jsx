import React, { useState, useEffect } from "react";
import AramaCubugu from "./components/AramaCubugu";
import KategoriFiltre from "./components/KategoriFiltre";
import KitapListe from "./components/KitapListe";
import FavoriPaneli from "./components/FavoriPaneli";

// --- Sabit Veriler ---
const SABIT_KITAPLAR = [
  { id: 1, baslik: "Tasarım İlkeleri", yazar: "M. Can", kategori: "Tasarım" },
  { id: 2, baslik: "Sessiz Şehir", yazar: "E. Demirci", kategori: "Biyografi" },
  { id: 3, baslik: "CSS Grid", yazar: "F. Öztürk", kategori: "Web" },
  { id: 4, baslik: "Gün Batımı Sokakları", yazar: "N. Yıldız", kategori: "Tarih" },
  { id: 5, baslik: "Sisler İçinde", yazar: "O. Arslan", kategori: "Felsefe" },
  { id: 6, baslik: "Kır Çiçeği", yazar: "L. Ak", kategori: "Bilim Kurgu" },
  { id: 7, baslik: "Python Programlama", yazar: "Z. Yılmaz", kategori: "CS" },
  { id: 8, baslik: "Bir Yazın Hatırası", yazar: "M. Ersoy", kategori: "Roman" },
];

const KATEGORILER = ["Tümü", ...new Set(SABIT_KITAPLAR.map((kitap) => kitap.kategori))];

const LS_ARAMA_KEY = "mini_kitaplik_arama";
const LS_FAVORI_KEY = "mini_kitaplik_favoriler";

// --- Ana App ---
export default function App() {
  const [aramaMetni, setAramaMetni] = useState(() => localStorage.getItem(LS_ARAMA_KEY) || "");
  const [kategori, setKategori] = useState("Tümü");
  const [favoriler, setFavoriler] = useState(() => {
    const kayitliFavoriler = localStorage.getItem(LS_FAVORI_KEY);
    return kayitliFavoriler ? JSON.parse(kayitliFavoriler) : [];
  });

  useEffect(() => {
    localStorage.setItem(LS_ARAMA_KEY, aramaMetni);
  }, [aramaMetni]);

  useEffect(() => {
    localStorage.setItem(LS_FAVORI_KEY, JSON.stringify(favoriler));
  }, [favoriler]);

  useEffect(() => {
    document.title = "Mini Kitaplık";
  }, []);

  const handleFavoriToggle = (kitapId) => {
    setFavoriler((prevFavoriler) =>
      prevFavoriler.includes(kitapId)
        ? prevFavoriler.filter((id) => id !== kitapId)
        : [...prevFavoriler, kitapId]
    );
  };

  const filtrelenmisKitaplar = SABIT_KITAPLAR.filter((kitap) => {
    const kategoriFiltresi = kategori === "Tümü" ? true : kitap.kategori === kategori;
    const aramaFiltresi =
      kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      kitap.yazar.toLowerCase().includes(aramaMetni.toLowerCase());
    return kategoriFiltresi && aramaFiltresi;
  });

  return (
    <div className="bg-blue-50 min-h-screen font-sans text-gray-900">
      <div className="container mx-auto p-4 md:p-8 max-w-screen-xl"> 
        <header className="mb-8">
          <h1 className="text-5xl font-extrabold text-center text-blue-900">
            Mini Kitaplık
          </h1>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="sm:col-span-2">
                <AramaCubugu aramaMetni={aramaMetni} onAramaDegisikligi={setAramaMetni} />
              </div>
              <div className="sm:col-span-1">
                <KategoriFiltre
                  seciliKategori={kategori}
                  onKategoriDegisikligi={setKategori}
                  categories={KATEGORILER}
                />
              </div>
            </div>
            <KitapListe
              kitaplar={filtrelenmisKitaplar}
              favoriler={favoriler}
              onFavoriToggle={handleFavoriToggle}
            />
          </div>
          <div className="lg:col-span-1">
            <FavoriPaneli
              favoriler={favoriler}
              kitaplar={SABIT_KITAPLAR}
              onFavoriKaldir={handleFavoriToggle}
            />
          </div>
        </main>

        <footer className="mt-8 text-center text-sm text-gray-600">
          Emircan Bartan - 2221032711
        </footer>
      </div>
    </div>
  );
}
