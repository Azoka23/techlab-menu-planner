import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cocina from "./pages/Cocina";

export default function App() {
  // Inicializamos con "cocina" si ya hay un token/nombre guardado, o "login" por defecto
  const [pantallaActual, setPantallaActual] = useState(
    localStorage.getItem("nombre") ? "cocina" : "login",
  );

  const manejarLoginOregistroExitoso = () => {
    setPantallaActual("cocina");
  };

  const manejarCerrarSesion = () => {
    // 🧼 Limpiamos las credenciales para que nadie husmee
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol");
    setPantallaActual("login");
  };

  return (
    <>
      {pantallaActual === "login" && (
        <Login
          alCambiarPantalla={() => setPantallaActual("register")}
          alLoguearse={manejarLoginOregistroExitoso}
        />
      )}
      {pantallaActual === "register" && (
        <Register alCambiarPantalla={() => setPantallaActual("login")} />
      )}
      {pantallaActual === "cocina" && (
        <Cocina alCerrarSesion={manejarCerrarSesion} />
      )}
    </>
  );
}
