// Apuntamos directo al dominio del backend en internet
export const API_URL = "";

export const apiService = {
  // El login va a https://bistro-api-arroyo.vercel.app/auth/login
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

  // El registro va a https://bistro-api-arroyo.vercel.app/auth/register
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
