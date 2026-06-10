export default function PlanificadorPanel({
  bancoDeRecetas,
  setRecetaAbierta,
  agregarPlatoAFecha,
  platosElegidosHoy,
  eliminarPlatoDeFecha,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Catálogo de Recetas */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
          ¿Qué plato vas a agregar hoy? (Hacé clic en uno para ver la receta
          completa)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bancoDeRecetas.length > 0 ? (
            bancoDeRecetas.map((plato) => (
              <div
                key={plato.id}
                className="p-4 bg-white rounded-2xl border border-amber-100/60 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all"
              >
                <div
                  className="flex gap-3 items-start mb-3 cursor-pointer"
                  onClick={() => setRecetaAbierta(plato)}
                >
                  <div className="text-3xl bg-amber-50 p-2 rounded-xl">
                    {plato.emoji || "🍽️"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 hover:text-amber-600 transition-colors">
                      {plato.nombre} 📖
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {plato.desc}
                    </p>
                    {/* 👇 AGREGADO: Etiqueta de Costo Estimado para el Comensal */}
                    <div className="mt-2">
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
                        Costo: ${plato.precio}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => agregarPlatoAFecha(plato)}
                  className="w-full py-2 bg-amber-50 hover:bg-[#2C3E50] text-amber-800 hover:text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  ➕ Sumar al día
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400 italic py-4 col-span-2">
              Cargando catálogo desde Firestore... Asegúrate de tener prendido
              el backend.
            </p>
          )}
        </div>
      </div>

      {/* Menú del Día Seleccionado */}
      <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-gray-700 border-b border-gray-100 pb-2">
          🍱 Menú de esta fecha
        </h3>
        {platosElegidosHoy.length > 0 ? (
          <div className="space-y-2">
            {platosElegidosHoy.map((plato, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2.5 bg-amber-50/40 rounded-xl border border-amber-100/30 text-xs font-medium"
              >
                <span
                  className="truncate cursor-pointer hover:text-amber-600"
                  onClick={() => setRecetaAbierta(plato)}
                >
                  {plato.emoji || "🍽️"} {plato.nombre} 📖
                </span>
                <button
                  onClick={() => eliminarPlatoDeFecha(plato.id)}
                  className="text-rose-500 hover:scale-110 font-bold px-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic py-6 text-center">
            Sin platos seleccionados para este día.
          </p>
        )}
      </div>
    </div>
  );
}
