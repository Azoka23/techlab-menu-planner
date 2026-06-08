export default function HistorialPanel({
  agendaFechas,
  vaciarHistorialCompleto,
  obtenerPlatosDeFecha,
  setRecetaAbierta,
  setFechaSeleccionada,
  setSeccionActiva,
  formatearFechaAmigable,
}) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-8 border border-amber-100 shadow-md">
      <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-6">
        <div>
          <h3 className="font-serif font-bold text-xl text-[#2C3E50]">
            Bitácora Gastronómica 📜
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Historial completo de días planificados (Clic en un plato para ver
            su receta)
          </p>
        </div>
        {Object.keys(agendaFechas).length > 0 && (
          <button
            onClick={vaciarHistorialCompleto}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-[11px] font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer border border-rose-100"
          >
            🗑️ Limpiar Historial
          </button>
        )}
      </div>

      {Object.keys(agendaFechas).length > 0 ? (
        <div className="space-y-4">
          {Object.keys(agendaFechas)
            .sort()
            .map((fecha) => {
              const platosSucios = obtenerPlatosDeFecha(fecha);
              const platosOrdenados = [...platosSucios].sort((a, b) =>
                (a?.nombre || "").localeCompare(b?.nombre || ""),
              );

              return (
                <div
                  key={fecha}
                  className="p-4 bg-amber-50/10 border border-amber-100/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-amber-50/30"
                >
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-amber-800 font-mono capitalize">
                      📅 {formatearFechaAmigable(fecha)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {platosOrdenados.map(
                        (plato, i) =>
                          plato && (
                            <span
                              key={i}
                              onClick={() => setRecetaAbierta(plato)}
                              className="bg-white px-2.5 py-1 rounded-xl border border-gray-100 shadow-2xs text-xs font-medium text-gray-700 cursor-pointer hover:text-amber-600 transition-colors"
                            >
                              {plato.emoji || "🍽️"} {plato.nombre} 📖
                            </span>
                          ),
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFechaSeleccionada(fecha);
                      setSeccionActiva("planificador");
                    }}
                    className="px-3 py-1.5 bg-[#2C3E50] hover:bg-amber-500 text-white text-[11px] font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer shrink-0 text-center"
                  >
                    ✈️ Viajar a este día
                  </button>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 italic">
          <span className="text-4xl block mb-2">📜</span>
          El historial está vacío.
        </div>
      )}
    </div>
  );
}
