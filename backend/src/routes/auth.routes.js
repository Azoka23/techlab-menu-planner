import { Router } from "express";
import { db } from "../config/firebase.js";
import jwt from "jsonwebtoken"; // 👈 1. Importamos la librería para generar tokens reales

const router = Router();

// --- ✨ AJUSTADO: RUTA DE LOGIN REAL CON FIRESTORE Y JWT VALIDO ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscamos al usuario en la colección "users" de Firestore usando su email
    const userRef = db.collection("users").doc(email);
    const doc = await userRef.get();

    // 2. Si no existe el correo en la base de datos
    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: "No encontramos ningún ayudante con ese correo." });
    }

    const usuarioData = doc.data();

    // 3. Validamos la contraseña directa
    if (usuarioData.password !== password) {
      return res.status(401).json({
        message: "Contraseña incorrecta. ¡Cuidado con quemar la salsa!",
      });
    }

    // 4. ✨ GENERAMOS EL TOKEN REAL usando la clave secreta de tu archivo .env
    // Le metemos adentro el email, rol y nombre para que el middleware pueda leerlo si hace falta
    const tokenReal = jwt.sign(
      {
        email: usuarioData.email,
        rol: usuarioData.rol,
        nombre: usuarioData.nombre,
      },
      process.env.JWT_SECRET_KEY, // 👈 Usa la clave "ClaveSuperSecretaPlanificadorMenu2026" de tu .env
      { expiresIn: "4h" }, // El token va a vencer en 4 horas por seguridad
    );

    // 5. Si todo está perfecto, le mandamos sus datos reales y el TOKEN REAL al Frontend
    res.status(200).json({
      status: "success", // Agregamos el status para mantener consistencia
      message: "¡Ingreso exitoso a la cocina!",
      data: {
        token: tokenReal, // 👈 ¡Mágia! Ahora viaja la firma válida que el middleware espera
        nombre: usuarioData.nombre,
        rol: usuarioData.rol,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor al abrir el depósito." });
  }
});

// --- RUTA DE REGISTRO TEMÁTICA ---
router.post("/register", async (req, res) => {
  const { nombre, email, password, rol, preferencia } = req.body;

  try {
    // 1. Verificamos si el ayudante de cocina ya existe in Firestore
    const userRef = db.collection("users").doc(email);
    const doc = await userRef.get();

    if (doc.exists) {
      return res
        .status(400)
        .json({ message: "Este correo ya está registrado en la cocina." });
    }

    // 2. Guardamos la ficha completa en la colección "users" de tu base de datos
    await userRef.set({
      nombre,
      email,
      password,
      rol,
      preferencia,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ message: "¡Ayudante registrado con éxito! 📜" });
  } catch (error) {
    console.error("Error en registro:", error);
    res
      .status(500)
      .json({ message: "Error del servidor al organizar la cocina." });
  }
});

export default router;
