import jwt from "jsonwebtoken";

const USUARIOS_VALIDOS = [
  {
    email: "chef@techlab.com",
    password: "admin123",
    nombre: "Marcela (Chef)",
    rol: "admin",
  },
  {
    email: "familia@techlab.com",
    password: "user123",
    nombre: "Invitado Casa",
    rol: "user",
  },
];

export const authService = {
  loginUser: async (email, password) => {
    const usuario = USUARIOS_VALIDOS.find(
      (u) => u.email === email && u.password === password,
    );

    if (!usuario) {
      // Lanzamos un error 401 (No autorizado) que es lo que pide la consigna
      throw { status: 401, message: "Credenciales incorrectas" };
    }

    // Firmamos el Token
    const token = jwt.sign(
      {
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "4h" },
    );

    return {
      token,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };
  },
};
