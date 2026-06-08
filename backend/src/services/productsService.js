import { productsModel } from "../models/productsModel.js";

export const productsService = {
  getAllProducts: async () => {
    return await productsModel.getAll();
  },

  getProductById: async (id) => {
    const product = await productsModel.getById(id);
    if (!product) {
      throw { status: 404, message: "Plato no encontrado en el menú" };
    }
    return product;
  },

  createProduct: async (productData) => {
    // ✨ Validamos con los campos reales, prolijos y definitivos en español
    if (!productData.nombre || productData.precio === undefined) {
      throw {
        status: 400,
        message: "Faltan campos obligatorios en la cocina: nombre y precio",
      };
    }
    return await productsModel.create(productData);
  },

  deleteProduct: async (id) => {
    await productsService.getProductById(id);
    return await productsModel.delete(id);
  },

  updateProduct: async (id, updatedData) => {
    await productsService.getProductById(id);
    return await productsModel.update(id, updatedData);
  },
};
