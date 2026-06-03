import express from "express";
import cors from "cors";
import "dotenv/config";

// --- IMPORTACIÓN DE RUTAS ---
import productsRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES GLOBALES ---
app.use(cors());
app.use(express.json()); // Cumple con el requerimiento de interpretar JSON en el body

// --- CONEXIÓN DE RUTAS ---
// Al ponerle el prefijo "/auth", la ruta final será: POST http://localhost:3000/auth/login
app.use("/auth", authRoutes);

// Al ponerle el prefijo "/api/products", coincidirá con: GET /api/products, POST /api/products/create, etc.
app.use("/api/products", productsRoutes);

// Ruta de prueba para verificar que el servidor responda
app.get("/ping", (req, res) => {
  res.json({
    status: "success",
    message: "¡Backend del Planificador de Menú activo! 🍲",
  });
});

// --- MIDDLEWARE PARA RUTAS DESCONOCIDAS (REQUERIMIENTO #3) ---
// Este middleware atrapa cualquier ruta que no coincida con las anteriores y devuelve un 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada. Verifica el método HTTP y la URL.",
  });
});

// --- APERTURA DEL PUERTO ---
app.listen(PORT, () => {
  console.log(`\n🚀 SERVIDOR ACTIVO EN: http://localhost:${PORT}`);
  console.log(`📂 Productos/Menús: http://localhost:${PORT}/api/products`);
  console.log(`🔐 Login: http://localhost:${PORT}/auth/login\n`);
});
