export default function RecetaModal({ recetaAbierta, setRecetaAbierta }) {
  if (!recetaAbierta) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 max-h-[85vh] overflow-y-auto border border-amber-100 shadow-2xl space-y-6">
        <div className="flex justify-between items-start border-b border-gray-100 pb-4">
          <div className="flex gap-3 items-center">
            <span className="text-4xl">{recetaAbierta.emoji || "🍽️"}</span>
            <div>
              <h3 className="font-serif font-bold text-xl text-gray-800">
                {recetaAbierta.nombre}
              </h3>
              <span className="text-[10px] uppercase font-extrabold tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md mt-1 inline-block">
                {recetaAbierta.tipo || "Gourmet"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setRecetaAbierta(null)}
            className="text-gray-400 hover:text-rose-500 font-bold text-xl px-2 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-extrabold text-amber-800 uppercase tracking-widest">
            🛒 Ingredientes Necesarios:
          </h4>
          <ul className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-xs font-medium text-gray-700">
            {recetaAbierta.ingredientes?.length > 0 ? (
              recetaAbierta.ingredientes.map((ing, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>• {ing.nombre}</span>
                  <span className="font-mono font-bold text-gray-500">
                    {ing.cantidad} {ing.unidad}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">
                No se especificaron ingredientes.
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-amber-800 uppercase tracking-widest">
            👨‍🍳 Instrucciones:
          </h4>
          <ol className="space-y-3 text-xs text-gray-600">
            {recetaAbierta.pasos?.length > 0 ? (
              recetaAbierta.pasos.map((paso, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start bg-amber-50/20 p-2.5 rounded-xl border border-amber-100/20"
                >
                  <span className="font-mono font-bold text-amber-600 bg-amber-100/50 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed">{paso}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">
                No se cargó el paso a paso.
              </li>
            )}
          </ol>
        </div>
        <button
          onClick={() => setRecetaAbierta(null)}
          className="w-full py-2.5 bg-[#2C3E50] hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
        >
          Listo, ¡Entendido! 🍳
        </button>
      </div>
    </div>
  );
}
