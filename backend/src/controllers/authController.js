import { authService } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const authData = await authService.loginUser(email, password);

    res.status(200).json({
      status: "success",
      message: "¡Login exitoso!",
      data: authData,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Error en el servidor de autenticación",
    });
  }
};
