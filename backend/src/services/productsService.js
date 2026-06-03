import { productsModel } from "../models/productsModel.js";

export const productsService = {
  getAllProducts: async () => {
    return await productsModel.getAll();
  },

  getProductById: async (id) => {
    const product = await productsModel.getById(id);
    if (!product) {
      throw { status: 404, message: "Producto no encontrado" };
    }
    return product;
  },

  createProduct: async (productData) => {
    // Acá podrías validar que vengan los campos obligatorios
    if (!productData.name || !productData.price) {
      throw {
        status: 400,
        message: "Faltan campos obligatorios: name y price",
      };
    }
    return await productsModel.create(productData);
  },

  deleteProduct: async (id) => {
    // Primero verificamos si existe antes de borrar
    await productsService.getProductById(id);
    return await productsModel.delete(id);
  },
  // Agregar esto al final del objeto productsService (antes del };)
  updateProduct: async (id, updatedData) => {
    // Verificamos que exista antes de actualizar
    await productsService.getProductById(id);
    return await productsModel.update(id, updatedData);
  },
};
