import React from "react";

export default function KategoriFiltre({ seciliKategori, onKategoriDegisikligi, categories = [] }) {
  return (
    <select
      value={seciliKategori}
      onChange={(e) => onKategoriDegisikligi(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
    >
      {categories.map((kategori) => (
        <option key={kategori} value={kategori}>
          {kategori}
        </option>
      ))}
    </select>
  );
}
