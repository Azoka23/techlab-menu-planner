import { useState } from "react";
import { apiService } from "../services/api";

export default function Login({ alCambiarPantalla, alLoguearse }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const data = await apiService.login(email, password);

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("rol", data.data.rol);
      localStorage.setItem("nombre", data.data.nombre);

      setCargando(false);
      alLoguearse(); // ✨ ¡Magia! En vez de solo un alert, te mete adentro de la cocina
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor");
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] px-4 relative overflow-hidden">
      {/* Detalles de fondo temáticos */}
      <div className="absolute top-10 left-10 text-4xl opacity-20 select-none animate-bounce">
        👨‍🍳
      </div>
      <div className="absolute bottom-10 right-10 text-4xl opacity-20 select-none rotate-12">
        🍳
      </div>
      <div className="absolute top-1/3 right-12 text-4xl opacity-10 select-none -rotate-12">
        🥖
      </div>
      <div className="absolute bottom-1/4 left-12 text-4xl opacity-10 select-none">
        🧀
      </div>

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-amber-100/50 relative">
        {/* Sombrero de Chef superior */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="bg-amber-50 text-3xl p-4 rounded-full shadow-inner border border-amber-100">
            👨‍🍳
          </div>
        </div>

        {/* Encabezado Estilo Ratatouille */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#2C3E50] tracking-tight font-serif">
            TechLab <span className="text-amber-600">Bistro</span>
          </h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
            "Cualquiera puede cocinar"
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-sm rounded-xl text-center font-medium">
            ❌ {error}
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          autoComplete="new-password"
        >
          {/* 🧙‍♂️ TRAMPA PARA CHROME: Inputs fantasmas invisibles para atrapar el autocompletado */}
          <input type="text" name="email_fake" style={{ display: "none" }} />
          <input
            type="password"
            name="password_fake"
            style={{ display: "none" }}
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
              <span>📧</span> Correo del Personal
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl border border-amber-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
              placeholder="chef@techlab.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1">
              <span>🔑</span> Contraseña
            </label>
            <div className="relative">
              <input
                type={verPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-xl border border-amber-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setVerPassword(!verPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-125 transition-transform duration-150 cursor-pointer"
              >
                {verPassword ? "🐹" : "🐭"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full mt-2 py-3.5 bg-[#2C3E50] hover:bg-amber-700 text-white text-sm font-bold rounded-xl shadow-md active:scale-[0.98] transition-all duration-150 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>
              {cargando ? "Encendiendo hornallas..." : "Prender Hornallas 🍳"}
            </span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            ¿Nuevo ayudante de cocina?{" "}
            <button
              type="button"
              onClick={alCambiarPantalla}
              className="text-amber-600 font-bold hover:underline cursor-pointer block mx-auto mt-1 text-sm normal-case"
            >
              Crear una cuenta en el Bistro 📜
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
