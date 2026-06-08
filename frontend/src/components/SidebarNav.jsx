export default function SidebarNav({
  usuario,
  seccionActiva,
  setSeccionActiva,
  listaSuperLength,
  ordenSecciones,
  navegarAtras,
  navegarAdelante,
  alCerrarSesion,
}) {
  return (
    <aside className="w-64 bg-[#2C3E50] text-white flex flex-col justify-between p-5 shadow-xl shrink-0">
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-white/10">
          <span className="text-2xl">👨‍🍳</span>
          <h1 className="font-serif font-bold text-lg tracking-tight">
            Bistro <span className="text-amber-400">Dashboard</span>
          </h1>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <p className="text-xs text-gray-300 font-bold">{usuario.nombre}</p>
          <p
            className={`text-[10px] uppercase tracking-widest font-extrabold mt-0.5 ${usuario.rol === "chef" ? "text-emerald-400" : "text-amber-400"}`}
          >
            {usuario.rol === "chef"
              ? "👨‍🍳 Perfil: Chef Admin"
              : "🍽️ Modo Comensal"}
          </p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setSeccionActiva("planificador")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${seccionActiva === "planificador" ? "bg-amber-500 text-white shadow-md" : "hover:bg-white/5 text-gray-300"}`}
          >
            📅 Planificar Menú
          </button>
          <button
            onClick={() => setSeccionActiva("supermercado")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${seccionActiva === "supermercado" ? "bg-amber-500 text-white shadow-md" : "hover:bg-white/5 text-gray-300"}`}
          >
            🛒 Lista del Súper ({listaSuperLength})
          </button>
          <button
            onClick={() => setSeccionActiva("historial")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${seccionActiva === "historial" ? "bg-amber-500 text-white shadow-md" : "hover:bg-white/5 text-gray-300"}`}
          >
            📜 Tu Historial
          </button>

          {usuario.rol === "chef" && (
            <button
              onClick={() => setSeccionActiva("admin")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${seccionActiva === "admin" ? "bg-emerald-600 text-white shadow-md" : "hover:bg-white/5 text-gray-300"}`}
            >
              👨‍🍳 Gestión del Chef
            </button>
          )}

          <div className="pt-4 flex items-center justify-between border-t border-white/5 px-2">
            <button
              onClick={navegarAtras}
              disabled={ordenSecciones.indexOf(seccionActiva) === 0}
              className={`w-10 h-8 rounded-lg flex items-center justify-center text-sm font-bold border transition-all ${ordenSecciones.indexOf(seccionActiva) === 0 ? "border-white/5 text-white/20 cursor-not-allowed" : "border-white/10 bg-white/5 hover:bg-white/20 text-white cursor-pointer active:scale-95"}`}
            >
              ←
            </button>
            <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">
              {ordenSecciones.indexOf(seccionActiva) + 1} / 4
            </span>
            <button
              onClick={navegarAdelante}
              disabled={
                ordenSecciones.indexOf(seccionActiva) ===
                ordenSecciones.length - 1
              }
              className={`w-10 h-8 rounded-lg flex items-center justify-center text-sm font-bold border transition-all ${ordenSecciones.indexOf(seccionActiva) === ordenSecciones.length - 1 ? "border-white/5 text-white/20 cursor-not-allowed" : "border-white/10 bg-white/5 hover:bg-white/20 text-white cursor-pointer active:scale-95"}`}
            >
              →
            </button>
          </div>
        </nav>
      </div>
      <button
        onClick={alCerrarSesion}
        className="w-full py-2.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
      >
        Cerrar Sesión 🚪
      </button>
    </aside>
  );
}
