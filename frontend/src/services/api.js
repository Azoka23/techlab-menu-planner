// ✨ Configuración para el Monorepo en Vercel: apuntamos a la ruta relativa /api
export const API_URL = "/api";

export const apiService = {
  // Login adaptado para pasar por el proxy de Vercel (/api/auth/login)
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Error en el login");
    }
    return res.json();
  },

  // Registro adaptado para pasar por el proxy de Vercel (/api/auth/register)
  register: async (nombre, email, password, rol, preferencia) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, rol, preferencia }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Error al registrar usuario");
    }
    return res.json();
  },
};
