import { useState } from "react";
import { apiService } from "../services/api";

export default function Register({ alCambiarPantalla }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false); // Ojito de Contraseña
  const [rol, setRol] = useState("user"); // "user" o "chef"
  const [llaveChef, setLlaveChef] = useState(""); // 🔑 Estado para la clave
  const [verLlaveChef, setVerLlaveChef] = useState(false); // 👇 NUEVO: Ojito de Llave de Chef
  const [preferencia, setPreferencia] = useState("sin_restricciones");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🛑 VALIDACIÓN TOTALMENTE BLINDADA:
    if (rol === "chef") {
      const LLAVE_SECRETA_SISTEMA = "GUSTEAU2026";
      // trim() limpia espacios vacíos si el usuario los puso por error
      if (
        !llaveChef ||
        llaveChef.trim().toUpperCase() !== LLAVE_SECRETA_SISTEMA
      ) {
        setError(
          "Llave de Autorización incorrecta o ausente. No estás autorizado a registrarte como Chef.",
        );
        return;
      }
    }

    setCargando(true);

    try {
      await apiService.register(nombre, email, password, rol, preferencia);

      alert(
        `📜 ¡Ficha Culinaria Creada con éxito!\nBienvenido a la brigada, ${nombre}. Ahora podés iniciar sesión.`,
      );

      setCargando(false);
      alCambiarPantalla(); // <--- ¡Te manda directo al Login automáticamente!
    } catch (err) {
      setError(err.message || "No se pudo firmar el contrato con el Bistro");
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4 py-6 relative overflow-hidden">
      {/* Elementos flotantes */}
      <div className="absolute top-12 right-12 text-4xl opacity-15 select-none rotate-45">
        🍅
      </div>
      <div className="absolute bottom-12 left-12 text-4xl opacity-15 select-none -rotate-12">
        🥦
      </div>
      <div className="absolute top-1/4 left-10 text-4xl opacity-10 select-none">
        🥄
      </div>
      <div className="absolute bottom-1/3 right-10 text-4xl opacity-10 select-none">
        🌿
      </div>

      <div className="max-w-md w-full bg-white p-6 rounded-3xl shadow-xl border border-amber-100/60 relative">
        {/* Gorro superior */}
        <div className="flex justify-center -mt-12 mb-3">
          <div className="bg-amber-50 text-2xl p-3 rounded-full shadow-inner border border-amber-100">
            📜
          </div>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-extrabold text-[#2C3E50] tracking-tight font-serif">
            Registro del <span className="text-amber-600">Bistro</span>
          </h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
            "Únete a la brigada de cocina"
          </p>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-rose-50 text-rose-600 text-xs rounded-xl text-center font-medium animate-fade-in">
            ❌ {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              👤 Nombre del Ayudante
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
              placeholder="Ej. Alfredo Linguini"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              📧 Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
              placeholder="linguini@bistro.com"
            />
          </div>

          {/* Contraseña (Con Ojito de Ratón) */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              🔑 Contraseña Secreta
            </label>
            <div className="relative">
              <input
                type={verPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setVerPassword(!verPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-lg hover:scale-125 transition-transform cursor-pointer"
              >
                {verPassword ? "🐹" : "🐭"}
              </button>
            </div>
          </div>

          {/* Botones de Selección */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
              🎭 Asignación en la Cocina
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setRol("user");
                  setError("");
                }}
                className={`py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  rol === "user"
                    ? "bg-[#2C3E50] border-[#2C3E50] text-white shadow-md"
                    : "bg-white border-amber-200 text-gray-600 hover:bg-amber-50/30"
                }`}
              >
                🍽️ Comensal
              </button>
              <button
                type="button"
                onClick={() => {
                  setRol("chef");
                  setError("");
                }}
                className={`py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  rol === "chef"
                    ? "bg-amber-600 border-amber-600 text-white shadow-md"
                    : "bg-white border-amber-200 text-gray-600 hover:bg-amber-50/30"
                }`}
              >
                👨‍🍳 Chef / Crítico
              </button>
            </div>
          </div>

          {/* 🔒 👇 NUEVO Campo Condicional con Ojito de Candado Implementado 👇 */}
          {rol === "chef" && (
            <div className="space-y-1 animate-fade-in">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                🔒 Llave de Autorización del Chef
              </label>
              <div className="relative">
                <input
                  type={verLlaveChef ? "text" : "password"} // 👈 Cambia dinámicamente el tipo
                  required
                  value={llaveChef}
                  onChange={(e) => setLlaveChef(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 bg-amber-50/40 text-amber-900 placeholder-amber-700/50 font-bold"
                  placeholder="Introduce el código secreto del Bistro"
                />
                <button
                  type="button"
                  onClick={() => setVerLlaveChef(!verLlaveChef)} // 👈 Alterna el estado del ojito
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xl hover:scale-125 transition-transform cursor-pointer"
                >
                  {verLlaveChef ? "🔓" : "🔒"}{" "}
                  {/* 👈 Emojis de candado temáticos */}
                </button>
              </div>
            </div>
          )}

          {/* Selector de Preferencias */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              🌾 Restricciones Alimentarias
            </label>
            <select
              value={preferencia}
              onChange={(e) => setPreferencia(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200/60 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white cursor-pointer text-gray-700 font-medium"
            >
              <option value="sin_restricciones">🍲 Menú Tradicional</option>
              <option value="vegetariano">🥗 Vegetariano (Ratatouille)</option>
              <option value="vegano">🌱 Vegano (100% Plant-based)</option>
              <option value="celiaco">🌾 Sin TACC / Celíaco</option>
            </select>
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full mt-1 py-3 bg-[#2C3E50] hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md active:scale-[0.98] transition-all duration-150 disabled:opacity-50 cursor-pointer text-center"
          >
            {cargando ? "Redactando pergamino..." : "Firmar Contrato 📜"}
          </button>
        </form>

        {/* ENLACE PARA VOLVER */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
          <button
            type="button"
            onClick={alCambiarPantalla}
            className="text-[#2C3E50] font-bold hover:underline cursor-pointer text-xs"
          >
            🍳 Volver a la cocina (Login)
          </button>
        </div>
      </div>
    </div>
  );
}
