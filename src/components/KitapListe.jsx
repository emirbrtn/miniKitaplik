import React from "react";
import KitapKarti from "./KitapKarti";

export default function KitapListe({ kitaplar, favoriler, onFavoriToggle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6 items-start">
      {kitaplar.length > 0 ? (
        kitaplar.map((kitap) => (
          <KitapKarti
            key={kitap.id}
            kitap={kitap}
            favorideMi={favoriler.includes(kitap.id)}
            onFavoriToggle={onFavoriToggle}
          />
        ))
      ) : (
        <p className="text-gray-500 md:col-span-2 text-center">
          Aradığınız kriterlere uygun kitap bulunamadı.
        </p>
      )}
    </div>
  );
}
