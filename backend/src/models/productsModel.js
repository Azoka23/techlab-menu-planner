import { db } from "../config/firebase.js";

const collectionName = "products"; // Nombre de la colección en Firestore

export const productsModel = {
  // Obtener todos los productos
  getAll: async () => {
    const snapshot = await db.collection(collectionName).get();
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  },

  // Obtener un producto por ID
  getById: async (id) => {
    const doc = await db.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  // Crear un nuevo producto
  create: async (productData) => {
    const docRef = await db.collection(collectionName).add(productData);
    return { id: docRef.id, ...productData };
  },

  // Eliminar un producto
  delete: async (id) => {
    await db.collection(collectionName).doc(id).delete();
    return true;
  },
  // Agregar esto al final del objeto productsModel (antes del };)
  update: async (id, updatedData) => {
    await db.collection(collectionName).doc(id).update(updatedData);
    return { id, ...updatedData };
  },
};
