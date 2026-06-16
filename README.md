# 👨‍🍳 Bistro Planificador - Ecosistema Gastronómico (Monorepo)

> 🚀 **Ecosistema Full-Stack B2B2C:** Una plataforma web centralizada que resuelve la gestión de costos y recetas para la cocina profesional junto con la planificación inteligente de menús para el consumidor final.

---

## 🔑 ACCESOS RÁPIDOS PARA LA CORRECCIÓN (PROFE NICO)

> ⚠️ **NOTA DE EVALUACIÓN:** Podés registrar nuevos usuarios libremente desde la interfaz. Si decidís registrar un nuevo **Chef (Administrador)**, el formulario te va a requerir de forma obligatoria la **Llave de Autorización**: **`GUSTEAU2026`** (¡cuenta con un switch interactivo `🔒/🔓` para ver los caracteres!).

| 🎭 Perfil de Rol          | 💻 Rol Equivalente | 📧 Correo Electrónico | 🔑 Contraseña | ⚡ Comportamiento en la Interfaz                                                                                                                         |
| :------------------------ | :----------------- | :-------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **👨‍🍳 Chef / Crítico**     | **ADMINISTRADOR**  | `admin@bistro.com`    | `123`         | **Panel de control absoluto a pantalla completa.** Control total del CRUD de Especialidades, Insumos e Ingeniería de Costos. Desactiva menús de cliente. |
| **🍽️ Comensal / Cliente** | **USUARIO COMÚN**  | `user@bistro.com`     | `123`         | **Flujo del consumidor final.** Calendario semanal interactivo con visualización de costos estimados, historial y lista de súper automatizada.           |

---

## 🎯 PUNTOS CLAVE DEL PRODUCTO

- 📂 **Arquitectura Monorepo:** Organización limpia que desacopla el Backend (`Node.js/Express`) del Frontend (`React`), manteniendo un control de versiones unificado.
- 🧮 **Data Integration:** La lista de compras semanal se calcula analíticamente cruzando las porciones del calendario del usuario con el desglose de ingredientes inyectado por el Chef.
- 💰 **Control de Costos Unificado:** Transparencia económica total. El Administrador parametriza los costos de elaboración en su ficha técnica y el Usuario común visualiza el costo estimado de producción antes de añadir el plato a su día.
- ⚡ **Performance useMemo:** Libro de recetas con motor de filtrado por algoritmia de escaneo cruzado en tiempo real (ADN del plato: _Veggie, Carnes, Pastas_), optimizado en memoria para soportar catálogos masivos.

---

## 🛠️ STACK TECNOLÓGICO

- 🎨 **Frontend:** React (SPA), Tailwind CSS (Diseño scannable temático de alta fidelidad), React Hooks.
- ⚙️ **Backend:** Node.js, Express (API limpia con endpoints semánticos y controladores modulares).
- 🔒 **Seguridad y Base de Datos:** Firebase Firestore (NoSQL Documental) y Autenticación robusta por JWT.
