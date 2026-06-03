import { productsService } from "../services/productsService.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Error al obtener los productos",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Error al buscar el producto",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    // El chef manda: name (ej: "Lunes"), almuerzo, cena, ingredientes, price (un precio ficticio para cumplir la consigna si es necesario)
    const newProduct = await productsService.createProduct(req.body);
    res.status(201).json({
      status: "success",
      message: "¡Producto/Menú creado con éxito!",
      data: newProduct,
    });
  } catch (error) {
    res.status(error.status || 400).json({
      status: "error",
      message: error.message || "Error al crear el producto",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productsService.updateProduct(id, req.body);
    res.status(200).json({
      status: "success",
      message: "¡Menú actualizado con éxito en Firestore!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Error al actualizar el producto",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);
    res.status(200).json({
      status: "success",
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Error al eliminar el producto",
    });
  }
};
