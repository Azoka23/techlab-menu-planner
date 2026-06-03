import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { verificarToken } from "../middlewares/authMiddleware.js"; // <-- Importamos

const router = Router();

// Endpoints públicos: Cualquier usuario logueado o visitante puede verlos
router.get("/", getProducts);
router.get("/:id", getProductById);

// Endpoints protegidos: Solo accesibles si mandan un token válido
router.post("/create", verificarToken, createProduct); // <-- Protegido
router.put("/:id", verificarToken, updateProduct); // <-- Protegido
router.delete("/:id", verificarToken, deleteProduct); // <-- Protegido

export default router;
