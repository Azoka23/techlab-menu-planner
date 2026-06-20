import { useState, useEffect } from "react";

export default function useCocina() {
  // ✨ URL directa agregada acá para saltear el import conflictivo de Vercel
  const API_URL = "";

  const [usuario, setUsuario] = useState({ nombre: "Ayudante", rol: "user" });
  const [seccionActiva, setSeccionActiva] = useState("planificador");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [agendaFechas, setAgendaFechas] = useState({});
  const [recetaAbierta, setRecetaAbierta] = useState(null);
  const [bancoDeRecetas, setBancoDeRecetas] = useState([]);

  const ordenSecciones = ["planificador", "supermercado", "historial", "admin"];

  // Carga preferencias del usuario e historial local
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

  // 🔄 Conexión con Firestore
  const cargarPlatosDeFirestore = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/products`);
      const resultado = await respuesta.json();
      if (resultado.status === "success" && Array.isArray(resultado.data)) {
        setBancoDeRecetas(resultado.data);
      }
    } catch (error) {
      console.error("Error de conexión con el backend:", error);
    }
  };

  // Carga inicial al montar el componente
  useEffect(() => {
    cargarPlatosDeFirestore();
  }, []);

  const navegarAtras = () => {
    const idx = ordenSecciones.indexOf(seccionActiva);
    if (idx > 0) setSeccionActiva(ordenSecciones[idx - 1]);
  };

  const navegarAdelante = () => {
    const idx = ordenSecciones.indexOf(seccionActiva);
    if (idx < ordenSecciones.length - 1)
      setSeccionActiva(ordenSecciones[idx + 1]);
  };

  const obtenerPlatosDeFecha = (fecha) => {
    const dato = agendaFechas[fecha];
    return dato ? (Array.isArray(dato) ? dato : [dato]) : [];
  };

  const agregarPlatoAFecha = (plato) => {
    const actuales = obtenerPlatosDeFecha(fechaSeleccionada);
    if (actuales.some((p) => p.id === plato.id)) return;
    const nueva = {
      ...agendaFechas,
      [fechaSeleccionada]: [...actuales, plato],
    };
    setAgendaFechas(nueva);
    localStorage.setItem(`agenda_${usuario.nombre}`, JSON.stringify(nueva));
  };

  const eliminarPlatoDeFecha = (platoId) => {
    const actuales = obtenerPlatosDeFecha(fechaSeleccionada);
    const filtrados = actuales.filter((p) => p.id !== platoId);
    const nueva = { ...agendaFechas };
    if (filtrados.length === 0) delete nueva[fechaSeleccionada];
    else nueva[fechaSeleccionada] = filtrados;
    setAgendaFechas(nueva);
    localStorage.setItem(`agenda_${usuario.nombre}`, JSON.stringify(nueva));
  };

  const vaciarHistorialCompleto = () => {
    if (window.confirm("⚠️ ¿Estás seguro de borrar todo tu historial?")) {
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

  const vaciarListaSemanal = () => {
    if (window.confirm("🛒 ¿Vaciar platos planificados para esta semana?")) {
      const nueva = { ...agendaFechas };
      diasDeEstaSemana.forEach((f) => delete nueva[f]);
      setAgendaFechas(nueva);
      localStorage.setItem(`agenda_${usuario.nombre}`, JSON.stringify(nueva));
    }
  };

  // ✨ AJUSTADO: Mapea usando .nombre en lugar del viejo .name de ingredientes
  const listaSuperConsolidada = (() => {
    const mapa = {};
    diasDeEstaSemana.forEach((f) => {
      obtenerPlatosDeFecha(f).forEach((plato) => {
        plato?.ingredientes?.forEach((ing) => {
          const clave = `${ing.nombre}_${ing.unidad}`;
          if (mapa[clave]) mapa[clave].cantidad += ing.cantidad;
          else mapa[clave] = { ...ing };
        });
      });
    });
    return Object.values(mapa).sort((a, b) =>
      (a.nombre || "").localeCompare(b.nombre || ""),
    );
  })();

  // ✨ AJUSTADO: Ordena usando .nombre en español para la vista de hoy
  const platosElegidosHoy = obtenerPlatosDeFecha(fechaSeleccionada).sort(
    (a, b) => (a.nombre || "").localeCompare(b.nombre || ""),
  );

  const formatearFechaAmigable = (f) =>
    new Date(f).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    });
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

  return {
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
    actualizarBanco: cargarPlatosDeFirestore,
  };
}
