import useCocina from "../hooks/useCocina";

// 📦 Componentes de Sección y UI
import AdminPanel from "../components/AdminPanel";
import SupermercadoPanel from "../components/SupermercadoPanel";
import HistorialPanel from "../components/HistorialPanel";
import PlanificadorPanel from "../components/PlanificadorPanel";
import SidebarNav from "../components/SidebarNav";
import RecetaModal from "../components/RecetaModal";

export default function Cocina({ alCerrarSesion }) {
  const {
    usuario,
    seccionActiva,
    setSeccionActiva,
    fechaSeleccionada,
    setFechaSeleccionada,
    recetaAbierta,
    setRecetaAbierta,
    bancoDeRecetas,
    ordenSecciones,
    agendaFechas,
    platosElegidosHoy,
    listaSuperConsolidada,
    lunesFormateado,
    domingoFormateado,
    navegarAtras,
    navegarAdelante,
    agregarPlatoAFecha,
    eliminarPlatoDeFecha,
    vaciarHistorialCompleto,
    vaciarListaSemanal,
    obtenerPlatosDeFecha,
    formatearFechaAmigable,
  } = useCocina();

  return (
    <div className="h-screen w-screen bg-[#FDFBF7] text-[#2C3E50] font-sans flex overflow-hidden">
      <SidebarNav
        usuario={usuario}
        seccionActiva={seccionActiva}
        setSeccionActiva={setSeccionActiva}
        listaSuperLength={listaSuperConsolidada.length}
        ordenSecciones={ordenSecciones}
        navegarAtras={navegarAtras}
        navegarAdelante={navegarAdelante}
        alCerrarSesion={alCerrarSesion}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-amber-100 flex items-center justify-between px-8 shrink-0">
          <h2 className="font-serif font-bold text-lg text-gray-800 capitalize">
            {seccionActiva === "planificador" && "Planificador Gastronómico"}
            {seccionActiva === "supermercado" &&
              "Chariot de Courses (Tu Compra Semanal)"}
            {seccionActiva === "historial" && "Tu Historial del Bistro"}
            {seccionActiva === "admin" && "Trastienda del Chef (CRUD)"}
          </h2>
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
              Fecha de Control:
            </span>
            <input
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-amber-900 focus:outline-none cursor-pointer"
            />
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto bg-[#FDFBF7]">
          {seccionActiva === "planificador" && (
            <PlanificadorPanel
              bancoDeRecetas={bancoDeRecetas}
              setRecetaAbierta={setRecetaAbierta}
              agregarPlatoAFecha={agregarPlatoAFecha}
              platosElegidosHoy={platosElegidosHoy}
              eliminarPlatoDeFecha={eliminarPlatoDeFecha}
            />
          )}
          {seccionActiva === "supermercado" && (
            <SupermercadoPanel
              listaSuperConsolidada={listaSuperConsolidada}
              lunesFormateado={lunesFormateado}
              domingoFormateado={domingoFormateado}
              vaciarListaSemanal={vaciarListaSemanal}
            />
          )}
          {seccionActiva === "historial" && (
            <HistorialPanel
              agendaFechas={agendaFechas}
              vaciarHistorialCompleto={vaciarHistorialCompleto}
              obtenerPlatosDeFecha={obtenerPlatosDeFecha}
              setRecetaAbierta={setRecetaAbierta}
              setFechaSeleccionada={setFechaSeleccionada}
              setSeccionActiva={setSeccionActiva}
              formatearFechaAmigable={formatearFechaAmigable}
            />
          )}
          {seccionActiva === "admin" && (
            <AdminPanel bancoDeRecetas={bancoDeRecetas} />
          )}
        </div>
      </main>

      <RecetaModal
        recetaAbierta={recetaAbierta}
        setRecetaAbierta={setRecetaAbierta}
      />
    </div>
  );
}
