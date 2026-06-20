import express from "express";
import cors from "cors";
import "dotenv/config";

// --- IMPORTACIÓN DE RUTAS ---
import productsRoutes from "./src/routes/products.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES GLOBALES ---
// ✨ Ajustamos CORS para permitir que tu Frontend en Vercel se conecte sin problemas
app.use(
  cors({
    origin: [
      "https://bistro-app-arroyo.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json()); // Cumple con el requerimiento de interpretar JSON en el body

// --- CONEXIÓN DE RUTAS ---
app.use("/auth", authRoutes);
app.use("/api/products", productsRoutes);

// Ruta de prueba para verificar que el servidor responda
app.get("/ping", (req, res) => {
  res.json({
    status: "success",
    message: "¡Backend del Planificador de Menú activo! 🍲",
  });
});

// --- MIDDLEWARE PARA RUTAS DESCONOCIDAS (REQUERIMIENTO #3) ---
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
