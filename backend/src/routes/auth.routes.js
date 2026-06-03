import { Router } from "express";
import { db } from "../config/firebase.js";

const router = Router();

// --- ✨ AJUSTADO: RUTA DE LOGIN REAL CON FIRESTORE ---
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
      return res
        .status(401)
        .json({
          message: "Contraseña incorrecta. ¡Cuidado con quemar la salsa!",
        });
    }

    // 4. Si todo está perfecto, le mandamos sus datos reales al Frontend
    res.status(200).json({
      message: "¡Ingreso exitoso a la cocina!",
      data: {
        token: "token-falso-bistro-123", // El token ficticio que espera tu frontend para validar
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
    // 1. Verificamos si el ayudante de cocina ya existe en Firestore
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
