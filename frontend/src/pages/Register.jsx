import { useState } from "react";
import { apiService } from "../services/api";

// Acá arriba agregamos { alCambiarPantalla } para que funcione la redirección limpia
export default function Register({ alCambiarPantalla }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [rol, setRol] = useState("user"); // "user" (Comensal) o "chef" (Admin)
  const [preferencia, setPreferencia] = useState("sin_restricciones");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      // Mandamos los datos reales al backend
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
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4 py-12 relative overflow-hidden">
      {/* Elementos flotantes de la cocina de Gusteau */}
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

      <div className="max-w-lg w-full bg-white p-8 rounded-3xl shadow-xl border border-amber-100/60 relative">
        {/* Gorro de Chef superior */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="bg-amber-50 text-3xl p-4 rounded-full shadow-inner border border-amber-100">
            📜
          </div>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#2C3E50] tracking-tight font-serif">
            Registro del <span className="text-amber-600">Bistro</span>
          </h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
            "Únete a la brigada de cocina"
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm rounded-xl text-center font-medium">
            ❌ {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              👤 Nombre del Ayudante
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-amber-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
              placeholder="Ej. Alfredo Linguini"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              📧 Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-amber-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
              placeholder="linguini@bistro.com"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              🔑 Contraseña Secreta
            </label>
            <div className="relative">
              <input
                type={verPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-amber-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setVerPassword(!verPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-125 transition-transform cursor-pointer"
              >
                {verPassword ? "🐹" : "🐭"}
              </button>
            </div>
          </div>

          {/* Selector de Rol (Estilo Botones Radatouille de Cobre/Madera) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              🎭 Asignación en la Cocina
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRol("user")}
                className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  rol === "user"
                    ? "bg-[#2C3E50] border-[#2C3E50] text-white shadow-md"
                    : "bg-white border-amber-200 text-gray-600 hover:bg-amber-50/30"
                }`}
              >
                🍽️ Comensal / Cliente
              </button>
              <button
                type="button"
                onClick={() => setRol("chef")}
                className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  rol === "chef"
                    ? "bg-amber-600 border-amber-600 text-white shadow-md"
                    : "bg-white border-amber-200 text-gray-600 hover:bg-amber-50/30"
                }`}
              >
                👨‍🍳 Chef / Crítico
              </button>
            </div>
          </div>

          {/* Selector de Preferencias Alimentarias (Muy premium) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              🌾 Restricciones o Alergias (Ficha Médica)
            </label>
            <select
              value={preferencia}
              onChange={(e) => setPreferencia(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-amber-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white cursor-pointer text-gray-700"
            >
              <option value="sin_restricciones">
                🍲 Menú Tradicional (Sin restricciones)
              </option>
              <option value="vegetariano">
                🥗 Vegetariano (Estilo Ratatouille clásico)
              </option>
              <option value="vegano">
                🌱 Vegano (100% libre de origen animal)
              </option>
              <option value="celiaco">🌾 Sin TACC / Celíaco</option>
            </select>
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full mt-2 py-3.5 bg-[#2C3E50] hover:bg-amber-700 text-white text-sm font-bold rounded-xl shadow-md active:scale-[0.98] transition-all duration-150 disabled:opacity-50 cursor-pointer text-center"
          >
            {cargando
              ? "Redactando pergamino..."
              : "Firmar Contrato con el Bistro 📜"}
          </button>
        </form>

        {/* ENLACE NATURAL PARA VOLVER AL LOGIN */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            ¿Ya tenés un puesto en la brigada?{" "}
            <button
              type="button"
              onClick={alCambiarPantalla}
              className="text-[#2C3E50] font-bold hover:underline cursor-pointer block mx-auto mt-1 text-sm normal-case"
            >
              Volver a la cocina 🍳
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
