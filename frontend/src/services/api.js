const API_URL = "http://localhost:3000";

export const apiService = {
  // El login que ya funcionaba
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

  // ✨ AGREGAMOS ESTO: El nuevo método para enviar el contrato al Bistro
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
