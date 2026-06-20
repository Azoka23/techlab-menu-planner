import { useState, useMemo } from "react";

export default function AdminPanel({ bancoDeRecetas, actualizarBanco }) {
  // ✨ URL directa agregada acá para saltear el import conflictivo de Vercel
  const API_URL = "https://bistro-api-arroyo.vercel.app";

  // 🧭 CONTROL DE PESTAÑAS INTERNAS
  const [subSeccion, setSubSeccion] = useState("formulario"); // "formulario" o "catalogo"

  // Estados del Formulario (CRUD)
  const [idEdicion, setIdEdicion] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [receta, setReceta] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
  const [nuevoIngNombre, setNuevoIngNombre] = useState("");
  const [nuevoIngCant, setNuevoIngCant] = useState("");
  const [nuevoIngUnidad, setNuevoIngUnidad] = useState("gr");

  // Estados de Búsqueda y Filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroEspecial, setFiltroEspecial] = useState("todos");

  // 🧠 FILTRADO INTELIGENTE
  const platosFiltrados = useMemo(() => {
    return bancoDeRecetas.filter((plato) => {
      const matchBusqueda =
        plato.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        plato.descripcion?.toLowerCase().includes(busqueda.toLowerCase());

      const ingredientesString = JSON.stringify(
        plato.ingredientes || "",
      ).toLowerCase();

      if (filtroEspecial === "carne") {
        return (
          matchBusqueda &&
          ["carne", "pollo", "vaca", "cerdo", "lomo", "bife", "panceta"].some(
            (c) => ingredientesString.includes(c),
          )
        );
      }
      if (filtroEspecial === "veggie") {
        return (
          matchBusqueda &&
          !["carne", "pollo", "vaca", "cerdo", "lomo", "bife", "panceta"].some(
            (c) => ingredientesString.includes(c),
          )
        );
      }
      if (filtroEspecial === "arroz") {
        return matchBusqueda && ingredientesString.includes("arroz");
      }
      return matchBusqueda;
    });
  }, [bancoDeRecetas, busqueda, filtroEspecial]);

  const sumarIngrediente = () => {
    if (!nuevoIngNombre || !nuevoIngCant) return;
    setIngredientes([
      ...ingredientes,
      {
        nombre: nuevoIngNombre,
        cantidad: Number(nuevoIngCant),
        unidad: nuevoIngUnidad,
      },
    ]);
    setNuevoIngNombre("");
    setNuevoIngCant("");
  };

  const activarEdicion = (plato) => {
    setIdEdicion(plato.id);
    setNombre(plato.nombre || "");
    setPrecio(plato.precio || "");
    setDescripcion(plato.descripcion || "");
    setReceta(plato.receta || "");
    setIngredientes(plato.ingredientes || []);
    setSubSeccion("formulario"); // 🔄 Te lleva directo a la ficha para editar
  };

  const limpiarFormulario = () => {
    setIdEdicion(null);
    setNombre("");
    setPrecio("");
    setDescripcion("");
    setReceta("");
    setIngredientes([]);
  };

  const guardarReceta = async (e) => {
    e.preventDefault();
    if (!nombre) return alert("El nombre es obligatorio.");
    const token = localStorage.getItem("token");
    const platoData = {
      nombre,
      precio: Number(precio),
      descripcion,
      receta,
      ingredientes,
    };

    const url = idEdicion
      ? `${API_URL}/api/products/${idEdicion}`
      : `${API_URL}/api/products/create`;

    try {
      const res = await fetch(url, {
        method: idEdicion ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(platoData),
      });
      if (res.ok) {
        alert(idEdicion ? "✨ ¡Plato modificado!" : "👨‍🍳 ¡Plato creado!");
        limpiarFormulario();
        if (actualizarBanco) await actualizarBanco();
        setSubSeccion("catalogo"); // 🔄 Te manda a ver el catálogo actualizado
      }
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarReceta = async (id, nombreP) => {
    if (!window.confirm(`¿Seguro que querés eliminar ${nombreP}?`)) return;
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) if (actualizarBanco) await actualizarBanco();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
      {/* 🧭 SELECTOR DE VISTA (BOTONERA SUPERIOR) */}
      <div className="flex justify-center bg-white p-1.5 rounded-2xl shadow-md border border-amber-100 max-w-sm mx-auto">
        <button
          onClick={() => setSubSeccion("formulario")}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            subSeccion === "formulario"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-gray-500 hover:text-amber-600"
          }`}
        >
          📝 {idEdicion ? "Editar Ficha" : "Nueva Receta"}
        </button>
        <button
          onClick={() => setSubSeccion("catalogo")}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subSeccion === "catalogo"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-gray-500 hover:text-amber-600"
          }`}
        >
          📖 Libro de Recetas
          <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-md font-extrabold">
            {bancoDeRecetas.length}
          </span>
        </button>
      </div>

      {/* 📝 SECCIÓN A: FORMULARIO */}
      {subSeccion === "formulario" && (
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100/70 max-w-2xl mx-auto space-y-5">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <h3 className="text-lg font-bold font-serif text-[#2C3E50]">
              {idEdicion
                ? "Modificar Ficha Técnica del Plato"
                : "Registrar Nueva Especialidad Gastronómica"}
            </h3>
            {idEdicion && (
              <button
                onClick={limpiarFormulario}
                className="text-[10px] bg-rose-50 text-rose-600 px-2 py-1 rounded-lg font-bold hover:bg-rose-100"
              >
                Cancelar Edición
              </button>
            )}
          </div>

          <form onSubmit={guardarReceta} className="space-y-4 text-xs">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-1">
                <label className="font-bold text-gray-400 uppercase text-[9px]">
                  Nombre del Plato
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Lomo al Malbec"
                  className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50/50 font-medium text-gray-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-gray-400 uppercase text-[9px]">
                  Costo Estimado ($)
                </label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ej: 4500"
                  className="w-full p-3 border border-gray-200 rounded-xl text-center font-bold text-amber-800 bg-gray-50/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[9px]">
                Descripción Comercial Corta
              </label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ej: Corte tierno con reducción de vino y papas rústicas."
                className="w-full p-3 border border-gray-200 rounded-xl text-gray-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-400 uppercase text-[9px]">
                Instrucciones de Cocina (Paso a Paso)
              </label>
              <textarea
                rows="4"
                value={receta}
                onChange={(e) => setReceta(e.target.value)}
                placeholder="Pasos detallados para el personal de cocina..."
                className="w-full p-3 border border-gray-200 rounded-xl resize-none text-gray-800"
              />
            </div>

            {/* Bloque de ingredientes */}
            <div className="bg-amber-50/10 p-4 rounded-2xl border border-amber-100 space-y-3">
              <h4 className="font-bold text-amber-800 uppercase text-[9px]">
                🛒 Desglose de Ingredientes
              </h4>
              <div className="grid grid-cols-3 gap-2 items-end">
                <input
                  type="text"
                  value={nuevoIngNombre}
                  onChange={(e) => setNuevoIngNombre(e.target.value)}
                  placeholder="Ingrediente"
                  className="p-2.5 border border-gray-200 rounded-xl bg-white col-span-1 text-xs"
                />
                <input
                  type="number"
                  value={nuevoIngCant}
                  onChange={(e) => setNuevoIngCant(e.target.value)}
                  placeholder="Cant"
                  className="p-2.5 border border-gray-200 rounded-xl bg-white text-xs"
                />
                <div className="flex gap-1">
                  <select
                    value={nuevoIngUnidad}
                    onChange={(e) => setNuevoIngUnidad(e.target.value)}
                    className="p-2.5 border border-gray-200 rounded-xl bg-white w-full text-xs font-medium"
                  >
                    <option value="gr">gr</option>
                    <option value="ml">ml</option>
                    <option value="unidades">U.</option>
                  </select>
                  <button
                    type="button"
                    onClick={sumarIngrediente}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-3 rounded-xl font-bold cursor-pointer"
                  >
                    ＋
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ingredientes.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-white border border-amber-200 text-gray-700 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium text-[11px]"
                  >
                    {ing.nombre} ({ing.cantidad} {ing.unidad})
                    <button
                      type="button"
                      onClick={() =>
                        setIngredientes(
                          ingredientes.filter((_, idx) => idx !== i),
                        )
                      }
                      className="text-rose-500 font-bold pl-1 hover:text-rose-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase rounded-xl shadow-md cursor-pointer tracking-wider text-center text-xs"
            >
              {idEdicion
                ? "💾 Actualizar Ficha de la Especialidad"
                : "🚀 Publicar en el Catálogo General"}
            </button>
          </form>
        </div>
      )}

      {/* 📖 SECCIÓN B: LIBRO DE RECETAS */}
      {subSeccion === "catalogo" && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-4 rounded-2xl shadow-md border border-amber-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Filtrar por nombre o ingrediente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs text-gray-800 font-medium"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
              {[
                { id: "todos", label: "Ver Todos", icon: "🍽️" },
                { id: "carne", label: "Carnes", icon: "🥩" },
                { id: "veggie", label: "Veggie", icon: "🥗" },
                { id: "arroz", label: "Con Arroz", icon: "🍚" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFiltroEspecial(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    filtroEspecial === f.id
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-amber-50 text-amber-800 hover:bg-amber-100"
                  }`}
                >
                  <span>{f.icon}</span> {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
            <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Detalle de Especialidades
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                Mostrando {platosFiltrados.length}
              </span>
            </div>

            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto p-4 space-y-1">
              {platosFiltrados.map((plato) => (
                <div
                  key={plato.id}
                  className="py-3 px-3 flex items-center justify-between group hover:bg-amber-50/20 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl bg-gray-50 p-2.5 rounded-xl border border-gray-100 shadow-sm">
                      {JSON.stringify(plato.ingredientes || "")
                        .toLowerCase()
                        .includes("arroz")
                        ? "🍚"
                        : ["carne", "pollo", "cerdo"].some((c) =>
                              JSON.stringify(plato.ingredientes || "")
                                .toLowerCase()
                                .includes(c),
                            )
                          ? "🥩"
                          : "🥗"}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">
                        {plato.nombre}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1 italic font-medium max-w-md">
                        {plato.descripcion ||
                          "Sin descripción corta registrada."}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
                          Costo: ${plato.precio}
                        </span>
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                          {plato.ingredientes?.length || 0} Ingredientes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => activarEdicion(plato)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => eliminarReceta(plato.id, plato.nombre)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      🗑️ Borrar
                    </button>
                  </div>
                </div>
              ))}

              {platosFiltrados.length === 0 && (
                <div className="text-center py-16 text-gray-400 space-y-2">
                  <span className="text-4xl">🍽️</span>
                  <p className="text-xs italic font-medium">
                    No hay recetas que coincidan con los criterios
                    seleccionados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
