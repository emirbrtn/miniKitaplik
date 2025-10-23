import React from "react";

export default function AramaCubugu({ aramaMetni, onAramaDegisikligi }) {
  return (
    <input
      type="text"
      value={aramaMetni}
      onChange={(e) => onAramaDegisikligi(e.target.value)}
      placeholder="Başlık veya yazar ara..."
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
    />
  );
}
