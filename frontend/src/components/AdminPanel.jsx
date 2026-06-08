import { useState } from "react";

export default function AdminPanel({ bancoDeRecetas, actualizarBanco }) {
  // Estados prolijos y sincronizados 1:1 con el Backend en español
  const [idEdicion, setIdEdicion] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [receta, setReceta] = useState("");

  // Estado dinámico para Ingredientes
  const [ingredientes, setIngredientes] = useState([]);
  const [nuevoIngNombre, setNuevoIngNombre] = useState("");
  const [nuevoIngCant, setNuevoIngCant] = useState("");
  const [nuevoIngUnidad, setNuevoIngUnidad] = useState("gr");

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

  const quitarIngrediente = (index) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const activarEdicion = (plato) => {
    setIdEdicion(plato.id);
    setNombre(plato.nombre || "");
    setPrecio(plato.precio || "");
    setDescripcion(plato.descripcion || "");
    setReceta(plato.receta || "");
    setIngredientes(plato.ingredientes || []);
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
    if (!nombre) return alert("El nombre del plato es obligatorio.");

    const token = localStorage.getItem("token");
    if (!token) return alert("No se encontró sesión activa. Volvé a ingresar.");

    // ✨ Estructura limpia y transparente: misma forma en Front y Back
    const platoData = {
      nombre,
      precio: precio ? Number(precio) : 0,
      descripcion,
      receta,
      ingredientes,
    };

    const url = idEdicion
      ? `http://localhost:3000/api/products/${idEdicion}`
      : "http://localhost:3000/api/products/create";

    const method = idEdicion ? "PUT" : "POST";

    try {
      const respuesta = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(platoData),
      });

      if (respuesta.ok) {
        alert(
          idEdicion
            ? "✨ Plato modificado con éxito"
            : "👨‍🍳 ¡Nuevo plato agregado a la cocina!",
        );
        limpiarFormulario();
        if (actualizarBanco) actualizarBanco();
      } else {
        const resultado = await respuesta.json();
        alert(
          "Error al guardar: " + (resultado.message || "Verificá los datos"),
        );
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  const eliminarReceta = async (id, nombrePlato) => {
    if (
      !window.confirm(
        `⚠️ ¿Seguro que querés eliminar "${nombrePlato}" de la base de datos?`,
      )
    )
      return;

    const token = localStorage.getItem("token");
    if (!token) return alert("No se encontró sesión activa.");

    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/products/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (respuesta.ok) {
        alert("Plato eliminado correctamente.");
        if (actualizarBanco) actualizarBanco();
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-gray-700">
      {/* 🧾 FORMULARIO DE RECOPILACIÓN */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100/70 space-y-5">
        <div className="flex items-center gap-3 border-b border-amber-100 pb-3">
          <span className="text-2xl">👨‍🍳</span>
          <div>
            <h2 className="text-xl font-bold font-serif text-[#2C3E50]">
              {idEdicion
                ? "Editar Ficha del Plato"
                : "Crear Nueva Especialidad"}
            </h2>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">
              Gestioná el menú gastronómico de forma directa
            </p>
          </div>
        </div>

        <form onSubmit={guardarReceta} className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <label className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                Nombre del Plato
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Risotto de Hongos"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none bg-gray-50/50 font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
                Precio ($)
              </label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="0"
                className="w-full p-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-amber-400 focus:outline-none bg-gray-50/50 font-bold text-amber-800"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
              Descripción / Reseña Corta
            </label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej: Pasta casera con salsa de nueces tostadas."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">
              Receta / Preparación (Paso a Paso)
            </label>
            <textarea
              rows="3"
              value={receta}
              onChange={(e) => setReceta(e.target.value)}
              placeholder="1. Hervir agua con sal...&#10;2. Saltear hongos...&#10;3. Mezclar y servir."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none font-medium resize-none text-[11px]"
            />
          </div>

          {/* Bloque de Ingredientes */}
          <div className="border border-amber-100 bg-amber-50/10 p-4 rounded-2xl space-y-3">
            <h4 className="font-bold text-amber-800 uppercase tracking-wider text-[10px] flex items-center gap-1">
              <span>🛒</span> Ingredientes Requeridos
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
              <input
                type="text"
                value={nuevoIngNombre}
                onChange={(e) => setNuevoIngNombre(e.target.value)}
                placeholder="Nombre (ej: Queso)"
                className="p-2 border border-gray-200 rounded-xl bg-white"
              />
              <input
                type="number"
                value={nuevoIngCant}
                onChange={(e) => setNuevoIngCant(e.target.value)}
                placeholder="Cant."
                className="p-2 border border-gray-200 rounded-xl bg-white"
              />
              <div className="flex gap-1">
                <select
                  value={nuevoIngUnidad}
                  onChange={(e) => setNuevoIngUnidad(e.target.value)}
                  className="p-2 border border-gray-200 rounded-xl bg-white w-full font-medium"
                >
                  <option value="gr">gr</option>
                  <option value="ml">ml</option>
                  <option value="unidades">U.</option>
                  <option value="cucharadas">Cdas</option>
                </select>
                <button
                  type="button"
                  onClick={sumarIngrediente}
                  className="px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl cursor-pointer"
                >
                  ＋
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ingredientes.map((ing, i) => (
                <span
                  key={i}
                  className="bg-white border border-amber-200 text-gray-700 px-2 py-1 rounded-lg flex items-center gap-1 font-medium text-[11px]"
                >
                  {ing.nombre} ({ing.cantidad} {ing.unidad})
                  <button
                    type="button"
                    onClick={() => quitarIngrediente(i)}
                    className="text-rose-500 font-bold hover:text-rose-700 pl-1"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase rounded-xl shadow-md cursor-pointer tracking-wider text-center text-xs"
            >
              {idEdicion ? "💾 Guardar Cambios" : "🚀 Publicar Especialidad"}
            </button>
            {idEdicion && (
              <button
                type="button"
                onClick={limpiarFormulario}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold uppercase rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 📜 LISTA DE PLATOS DISPONIBLES EN EL CATALOGO */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100 space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-lg font-bold font-serif text-[#2C3E50]">
            Catálogo de Especialidades
          </h3>
          <p className="text-[11px] text-gray-400 font-medium">
            Platos guardados en Firestore ({bancoDeRecetas.length})
          </p>
        </div>

        <div className="divide-y divide-gray-100 max-h-[480px] overflow-y-auto pr-1">
          {bancoDeRecetas.map((plato) => (
            <div
              key={plato.id}
              className="flex items-center justify-between py-3.5 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl bg-amber-50 p-2 rounded-xl border border-amber-100/50">
                  🍽️
                </span>
                <div>
                  <h4 className="font-bold text-xs text-gray-800">
                    {plato.nombre || "Plato sin nombre"}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    {plato.precio > 0 && (
                      <span className="text-[10px] text-amber-800 bg-amber-50 font-bold px-1.5 py-0.5 rounded-md">
                        ${plato.precio}
                      </span>
                    )}
                    <p className="text-[10px] text-gray-400 truncate max-w-[200px] italic">
                      {plato.descripcion || "Sin descripción corta"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => activarEdicion(plato)}
                  className="p-2 bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminarReceta(plato.id, plato.nombre)}
                  className="p-2 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
                >
                  🗑️ Borrar
                </button>
              </div>
            </div>
          ))}
          {bancoDeRecetas.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-12">
              No hay platos registrados en la cocina.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
