import { useEffect, useState } from "react";

export default function Cocina({ alCerrarSesion }) {
  const [usuario, setUsuario] = useState({ nombre: "Ayudante", rol: "user" });
  const [seccionActiva, setSeccionActiva] = useState("planificador"); // planificador | supermercado | historial
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [agendaFechas, setAgendaFechas] = useState({});

  // Estado para controlar qué receta se está leyendo en el modal flotante
  const [recetaAbierta, setRecetaAbierta] = useState(null);

  const ordenSecciones = ["planificador", "supermercado", "historial"];

  // Banco de recetas enriquecido con instrucciones de preparación reales
  const bancoDeRecetas = [
    {
      id: "r1",
      nombre: "Ratatouille Tradicional",
      tipo: "Vegano",
      emoji: "🥘",
      desc: "Rodajas de hortalizas horneadas con salsa de tomate y hierbas.",
      ingredientes: [
        { nombre: "Aceite de oliva", cantidad: 50, unidad: "ml" },
        { nombre: "Berenjena", cantidad: 1, unidad: "unidad(es)" },
        { nombre: "Calabacín", cantidad: 1, unidad: "unidad(es)" },
        { nombre: "Tomates perita", cantidad: 2, unidad: "unidad(es)" },
      ],
      pasos: [
        "Cortar la berenjena, el calabacín y los tomates en rodajas finas y uniformes.",
        "Preparar una base de salsa de tomate con ajo y verterla sobre una fuente para horno.",
        "Disponer las rodajas de hortalizas de forma intercalada, formando una espiral vistosa.",
        "Rociar con aceite de oliva, sal, pimienta y tomillo fresco.",
        "Cubrir con papel manteca y hornear a 180°C durante 40 minutos hasta que estén tiernas.",
      ],
    },
    {
      id: "r3",
      nombre: "Risotto de Hongos",
      tipo: "Vegetariano",
      emoji: "🍄",
      desc: "Arroz arborio cremoso cocinado a fuego lento con setas seleccionadas.",
      ingredientes: [
        { nombre: "Arroz Arborio", cantidad: 300, unidad: "g" },
        { nombre: "Caldo de verduras", cantidad: 1, unidad: "L" },
        { nombre: "Hongos Portobello", cantidad: 200, unidad: "g" },
        { nombre: "Manteca", cantidad: 30, unidad: "g" },
      ],
      pasos: [
        "Picar los hongos y saltearlos en una sartén con un poco de aceite hasta dorar. Reservar.",
        "En la misma olla, dorar el arroz arborio por 2 minutos hasta que esté nácar.",
        "Agregar el caldo de verduras caliente de a un cucharón por vez, revolviendo constantemente.",
        "Esperar que el arroz absorba el líquido antes de agregar el siguiente cucharón (unos 18 minutos).",
        "Apagar el fuego, incorporar los hongos, la manteca fría y revolver enérgicamente para mantecar.",
      ],
    },
    {
      id: "r2",
      nombre: "Sopa de Cebolla Gusteau",
      tipo: "Vegetariano",
      emoji: "🥣",
      desc: "Caldo profundo de cebollas caramelizadas con tostón de queso gratinado.",
      ingredientes: [
        { nombre: "Caldo de verduras", cantidad: 1, unidad: "L" },
        { nombre: "Cebollas grandes", cantidad: 4, unidad: "unidad(es)" },
        { nombre: "Manteca", cantidad: 50, unidad: "g" },
        { nombre: "Queso Gruyere", cantidad: 150, unidad: "g" },
      ],
      pasos: [
        "Cortar las cebollas en pluma fina.",
        "Derretir la manteca a fuego bajo y cocinar las cebollas por 30 minutos hasta que caramelicen intensamente.",
        "Verter el caldo de verduras caliente y cocinar a fuego lento por otros 20 minutos.",
        "Servir en cuencos aptos para horno, colocar una tostada arriba y cubrir con abundante queso gruyere.",
        "Gratinar en el horno al máximo hasta que el queso esté burbujeante y dorado.",
      ],
    },
  ];

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombre") || "Ayudante";
    setUsuario({
      nombre: nombreGuardado,
      rol: localStorage.getItem("rol") || "user",
    });
    const agendaGuardada = localStorage.getItem(`agenda_${nombreGuardado}`);
    if (agendaGuardada) {
      try {
        setAgendaFechas(JSON.parse(agendaGuardada));
      } catch (e) {
        setAgendaFechas({});
      }
    }
  }, []);

  const navegarAtras = () => {
    const indexActual = ordenSecciones.indexOf(seccionActiva);
    if (indexActual > 0) setSeccionActiva(ordenSecciones[indexActual - 1]);
  };

  const navegarAdelante = () => {
    const indexActual = ordenSecciones.indexOf(seccionActiva);
    if (indexActual < ordenSecciones.length - 1)
      setSeccionActiva(ordenSecciones[indexActual + 1]);
  };

  const obtenerPlatosDeFecha = (fecha) => {
    const dato = agendaFechas[fecha];
    if (!dato) return [];
    if (Array.isArray(dato)) return dato;
    return [dato];
  };

  const agregarPlatoAFecha = (plato) => {
    const platosActuales = obtenerPlatosDeFecha(fechaSeleccionada);
    if (platosActuales.some((p) => p.id === plato.id)) return;

    const nuevaAgenda = {
      ...agendaFechas,
      [fechaSeleccionada]: [...platosActuales, plato],
    };
    setAgendaFechas(nuevaAgenda);
    localStorage.setItem(
      `agenda_${usuario.nombre}`,
      JSON.stringify(nuevaAgenda),
    );
  };

  const eliminarPlatoDeFecha = (platoId) => {
    const platosActuales = obtenerPlatosDeFecha(fechaSeleccionada);
    const filtrados = platosActuales.filter((p) => p.id !== platoId);

    const nuevaAgenda = { ...agendaFechas };
    if (filtrados.length === 0) {
      delete nuevaAgenda[fechaSeleccionada];
    } else {
      nuevaAgenda[fechaSeleccionada] = filtrados;
    }
    setAgendaFechas(nuevaAgenda);
    localStorage.setItem(
      `agenda_${usuario.nombre}`,
      JSON.stringify(nuevaAgenda),
    );
  };

  const vaciarHistorialCompleto = () => {
    const confirmar = window.confirm(
      "⚠️ ¿Estás seguro de que querés borrar todo tu historial y menús planificados? Esta acción no se puede deshacer.",
    );
    if (confirmar) {
      setAgendaFechas({});
      localStorage.removeItem(`agenda_${usuario.nombre}`);
    }
  };

  const obtenerDiasDeLaSemanaActual = () => {
    const actual = new Date(fechaSeleccionada);
    const diaSemana = actual.getDay();
    const diferencia =
      actual.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
    const inicioLunes = new Date(actual.setDate(diferencia));

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(inicioLunes);
      d.setDate(inicioLunes.getDate() + i);
      return d.toISOString().split("T")[0];
    });
  };

  const diasDeEstaSemana = obtenerDiasDeLaSemanaActual();

  // 🧹 BOTÓN SOLICITADO: Limpia la lista del súper eliminando los platos solo de los 7 días de la semana activa
  const vaciarListaSemanal = () => {
    const confirmar = window.confirm(
      "🛒 ¿Querés vaciar los platos planificados para esta semana? Se mantendrá el resto de tu historial.",
    );
    if (confirmar) {
      const nuevaAgenda = { ...agendaFechas };
      diasDeEstaSemana.forEach((fecha) => {
        delete nuevaAgenda[fecha];
      });
      setAgendaFechas(nuevaAgenda);
      localStorage.setItem(
        `agenda_${usuario.nombre}`,
        JSON.stringify(nuevaAgenda),
      );
    }
  };

  const generarListaSuperConsolidada = () => {
    const mapaIngredientes = {};

    diasDeEstaSemana.forEach((fecha) => {
      const platosDelDia = obtenerPlatosDeFecha(fecha);
      platosDelDia.forEach((plato) => {
        if (plato && plato.ingredientes) {
          plato.ingredientes.forEach((ing) => {
            const clave = `${ing.nombre}_${ing.unidad}`;
            if (mapaIngredientes[clave]) {
              mapaIngredientes[clave].cantidad += ing.cantidad;
            } else {
              mapaIngredientes[clave] = { ...ing };
            }
          });
        }
      });
    });

    return Object.values(mapaIngredientes).sort((a, b) =>
      a.nombre.localeCompare(b.nombre),
    );
  };

  const listaSuperConsolidada = generarListaSuperConsolidada();
  const platosElegidosHoy = obtenerPlatosDeFecha(fechaSeleccionada).sort(
    (a, b) => a.nombre.localeCompare(b.nombre),
  );

  const formatearFechaAmigable = (fechaStr) => {
    const opciones = {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    };
    return new Date(fechaStr).toLocaleDateString("es-ES", opciones);
  };

  const lunesFormateado = diasDeEstaSemana[0]
    ? new Date(diasDeEstaSemana[0]).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      })
    : "";
  const domingoFormateado = diasDeEstaSemana[6]
    ? new Date(diasDeEstaSemana[6]).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      })
    : "";

  return (
    <div className="h-screen w-screen bg-[#FDFBF7] text-[#2C3E50] font-sans flex overflow-hidden">
      {/* 🧭 NAVIGATION SIDEBAR */}
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
            <p className="text-[10px] text-amber-400 uppercase tracking-widest font-extrabold mt-0.5">
              🍽️ Modo Comensal
            </p>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setSeccionActiva("planificador")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${seccionActiva === "planificador" ? "bg-amber-500 text-white shadow-md" : "hover:bg-white/5 text-gray-300"}`}
            >
              <span>📅</span> Planificar Menú
            </button>
            <button
              onClick={() => setSeccionActiva("supermercado")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${seccionActiva === "supermercado" ? "bg-amber-500 text-white shadow-md" : "hover:bg-white/5 text-gray-300"}`}
            >
              <span>🛒</span> Lista del Súper ({listaSuperConsolidada.length})
            </button>
            <button
              onClick={() => setSeccionActiva("historial")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${seccionActiva === "historial" ? "bg-amber-500 text-white shadow-md" : "hover:bg-white/5 text-gray-300"}`}
            >
              <span>📜</span> Tu Historial
            </button>

            {/* FLECHAS COMPACTAS */}
            <div className="pt-4 flex items-center justify-between border-t border-white/5 px-2">
              <button
                onClick={navegarAtras}
                disabled={ordenSecciones.indexOf(seccionActiva) === 0}
                className={`w-10 h-8 rounded-lg flex items-center justify-center text-sm font-bold border transition-all ${
                  ordenSecciones.indexOf(seccionActiva) === 0
                    ? "border-white/5 text-white/20 cursor-not-allowed"
                    : "border-white/10 bg-white/5 hover:bg-white/20 text-white cursor-pointer active:scale-95"
                }`}
              >
                ←
              </button>
              <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">
                {ordenSecciones.indexOf(seccionActiva) + 1} / 3
              </span>
              <button
                onClick={navegarAdelante}
                disabled={
                  ordenSecciones.indexOf(seccionActiva) ===
                  ordenSecciones.length - 1
                }
                className={`w-10 h-8 rounded-lg flex items-center justify-center text-sm font-bold border transition-all ${
                  ordenSecciones.indexOf(seccionActiva) ===
                  ordenSecciones.length - 1
                    ? "border-white/5 text-white/20 cursor-not-allowed"
                    : "border-white/10 bg-white/5 hover:bg-white/20 text-white cursor-pointer active:scale-95"
                }`}
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

      {/* 💻 CONTENEDOR PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Barra superior */}
        <header className="h-16 bg-white border-b border-amber-100 flex items-center justify-between px-8 shrink-0">
          <div>
            <h2 className="font-serif font-bold text-lg text-gray-800 capitalize">
              {seccionActiva === "planificador" && "Planificador Gastronómico"}
              {seccionActiva === "supermercado" &&
                "Chariot de Courses (Tu Compra Semanal)"}
              {seccionActiva === "historial" && "Tu Historial del Bistro"}
            </h2>
          </div>

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

        {/* CONTENIDO INTERNO */}
        <div className="flex-1 p-8 overflow-y-auto bg-[#FDFBF7]">
          {/* VISTA 1: PLANIFICADOR */}
          {seccionActiva === "planificador" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                  ¿Qué plato vas a agregar hoy? (Hacé clic en uno para ver la
                  receta completa)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bancoDeRecetas.map((plato) => (
                    <div
                      key={plato.id}
                      className="p-4 bg-white rounded-2xl border border-amber-100/60 shadow-xs flex flex-col justify-between hover:border-amber-400 transition-all"
                    >
                      {/* Al hacer clic en la tarjeta, se abre el modal con la receta completa */}
                      <div
                        className="flex gap-3 items-start mb-3 cursor-pointer"
                        onClick={() => setRecetaAbierta(plato)}
                      >
                        <div className="text-3xl bg-amber-50 p-2 rounded-xl">
                          {plato.emoji}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-800 hover:text-amber-600 transition-colors">
                            {plato.nombre} 📖
                          </h4>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {plato.desc}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => agregarPlatoAFecha(plato)}
                        className="w-full py-2 bg-amber-50 hover:bg-[#2C3E50] text-amber-800 hover:text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
                      >
                        ➕ Sumar al día
                      </button>
                    </div>
                  ))}
                </div>
              </div>

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
                          {plato.emoji} {plato.nombre} 📖
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
          )}

          {/* VISTA 2: SUPERMERCADO - COMPRA SEMANAL CON BOTÓN DE LIMPIEZA */}
          {seccionActiva === "supermercado" && (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-amber-100 p-6 md:p-8">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <div>
                  <h3 className="font-serif font-bold text-xl">
                    Compra Semanal 🛒
                  </h3>
                  <p className="text-xs text-[#amber-700] bg-amber-50 px-2 py-1 rounded-lg mt-1 inline-block font-mono font-bold">
                    📅 Del {lunesFormateado} al {domingoFormateado}
                  </p>
                </div>

                {/* 🧹 NUEVO BOTÓN: Limpia la lista del súper semanal */}
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
                  {domingoFormateado}). Agregá platos en el planificador para
                  armar tu lista.
                </div>
              )}
            </div>
          )}

          {/* VISTA 3: HISTORIAL */}
          {seccionActiva === "historial" && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-8 border border-amber-100 shadow-md">
              <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#2C3E50]">
                    Bitácora Gastronómica 📜
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Historial completo de días planificados (Clic en un plato
                    para ver su receta)
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
                      const platosOrdenados = [...platosSucios].sort((a, b) => {
                        if (!a?.nombre || !b?.nombre) return 0;
                        return a.nombre.localeCompare(b.nombre);
                      });

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
                                      {plato.emoji} {plato.nombre} 📖
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
          )}
        </div>
      </main>

      {/* 📖 MODAL FLOTANTE: El libro de cocina interactivo */}
      {recetaAbierta && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 max-h-[85vh] overflow-y-auto border border-amber-100 shadow-2xl space-y-6">
            {/* Cabecera del libro */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div className="flex gap-3 items-center">
                <span className="text-4xl">{recetaAbierta.emoji}</span>
                <div>
                  <h3 className="font-serif font-bold text-xl text-gray-800">
                    {recetaAbierta.nombre}
                  </h3>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md mt-1 inline-block">
                    {recetaAbierta.tipo}
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

            {/* Listado interno de Ingredientes */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-amber-800 uppercase tracking-widest">
                🛒 Ingredientes Necesarios:
              </h4>
              <ul className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-xs font-medium text-gray-700">
                {recetaAbierta.ingredientes.map((ing, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span>• {ing.nombre}</span>
                    <span className="font-mono font-bold text-gray-500">
                      {ing.cantidad} {ing.unidad}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Listado del Paso a Paso */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-amber-800 uppercase tracking-widest">
                👨‍🍳 Instrucciones de Preparación:
              </h4>
              <ol className="space-y-3 text-xs text-gray-600">
                {recetaAbierta.pasos?.map((paso, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-start bg-amber-50/20 p-2.5 rounded-xl border border-amber-100/20"
                  >
                    <span className="font-mono font-bold text-amber-600 bg-amber-100/50 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed">{paso}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Botón de cierre */}
            <button
              onClick={() => setRecetaAbierta(null)}
              className="w-full py-2.5 bg-[#2C3E50] hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Listo, ¡Entendido! 🍳
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
