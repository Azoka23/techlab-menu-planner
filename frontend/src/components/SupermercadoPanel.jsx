import { useState } from "react";

export default function SupermercadoPanel({
  listaSuperConsolidada,
  lunesFormateado,
  domingoFormateado,
  vaciarListaSemanal,
}) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-amber-100 p-6 md:p-8">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
        <div>
          <h3 className="font-serif font-bold text-xl">Compra Semanal 🛒</h3>
          <p className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-lg mt-1 inline-block font-mono font-bold">
            📅 Del {lunesFormateado} al {domingoFormateado}
          </p>
        </div>

        {listaSuperConsolidada.length > 0 && (
          <button
            onClick={vaciarListaSemanal}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-white text-[11px] font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer border border-amber-200"
          >
            🧹 Limpiar Lista
          </button>
        )}
      </div>

      {listaSuperConsolidada.length > 0 ? (
        <div className="space-y-6">
          <div className="divide-y divide-gray-100 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 max-h-96 overflow-y-auto">
            {listaSuperConsolidada.map((ing, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 text-xs"
              >
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer w-4 h-4"
                  />
                  <span className="font-medium text-gray-700">
                    {ing.nombre}
                  </span>
                </label>
                <span className="font-mono bg-amber-100/80 text-amber-900 px-2.5 py-0.5 rounded-lg font-bold">
                  {ing.cantidad} {ing.unidad}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => alert("📋 ¡Lista de la semana copiada!")}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
          >
            📱 Llevar Lista Semanal en el Celular
          </button>
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 italic">
          <span className="text-4xl block mb-2">📅</span>
          No hay ingredientes para esta semana ({lunesFormateado} -{" "}
          {domingoFormateado}). Agregá platos en el planificador para armar tu
          lista.
        </div>
      )}
    </div>
  );
}
