import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  // Capturamos el encabezado Authorization
  const authHeader = req.headers["authorization"];

  // El token suele venir como "Bearer <token>", así que lo separamos
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Acceso denegado. No se proporcionó un token.",
    });
  }

  try {
    // Verificamos el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Guardamos los datos del usuario dentro del objeto req para usarlo si hace falta
    req.user = decoded;

    next(); // Si todo está bien, dejamos continuar al controlador
  } catch (error) {
    return res.status(403).json({
      status: "error",
      message: "Token inválido o expirado.",
    });
  }
};
