# 👨‍🍳 Bistro Planificador - Ecosistema Gastronómico Full-Stack B2B2C (Monorepo)

**Bistro Planificador** es una plataforma web Full-Stack estructurada bajo una arquitectura de **Monorepo**, lo que permite centralizar de manera eficiente tanto el código del Servidor (`Backend`) como el del Cliente (`Frontend`) en un único repositorio, optimizando la gestión de dependencias y el despliegue del proyecto.

La aplicación está diseñada bajo un modelo de negocio **B2B2C** para resolver una problemática dual en el rubro gastronómico: la centralización operativa de recetas, insumos e ingeniería de costos para la cocina profesional (`Ecosistema Backoffice / Business`) y la planificación inteligente de menús saludables junto a la consolidación de compras para el consumidor final (`Ecosistema Cliente / Consumer`).

El core de la plataforma radica en su **arquitectura basada en roles dinámicos**, que transforma la interfaz por completo inyectando flujos de trabajo diferenciados según el perfil autenticado mediante JWT.

---

## 🎯 El Potencial del Producto (Value Proposition)

Este proyecto fue desarrollado pensando en la escalabilidad y el impacto de negocio:

- **Arquitectura Monorepo:** Organización limpia que desacopla la lógica de negocio del Backend de la interfaz de usuario, manteniendo un control de versiones unificado.
- **Data Integration (Cero Redundancia):** La lista de compras no es un texto estático; se calcula analíticamente cruzando las porciones elegidas por los usuarios en el calendario con la base de datos de ingredientes inyectada por el Chef.
- **Performance en Catálogos Críticos:** El Libro de Recetas cuenta con un motor de filtrado por algoritmia de escaneo cruzado en tiempo real. Soporta catálogos masivos (más de 500 platos) gracias a un renderizado optimizado por memoria (`useMemo`).
- **User Experience (UX) Coherente y Corporativa:** Se eliminaron las interfaces genéricas. El Administrador opera en un centro de control a pantalla completa libre de ruidos visuales, priorizando la velocidad de edición e inserción de datos de la ficha técnica.

---

## 👑 Arquitectura de Roles e Interfaz (Pantalla de Registro)

Al registrarse o iniciar sesión, el sistema identifica el perfil seleccionado y bifurca la experiencia de usuario, unificando la transparencia de los datos económicos en ambos lados:

### 👥 1. Perfil Comensal / Cliente (`rol: "user"`)

Diseñado para la fidelización y organización diaria del comensal.

- **Planificador Gastronómico con Control de Costos:** Calendario dinámico para asignar almuerzos y cenas, permitiendo al usuario visualizar de forma transparente el **Costo Estimado** de producción de cada plato antes de sumarlo a su día.
- **Chariot de Courses:** Algoritmia de consolidación que suma ingredientes idénticos, unifica unidades de medida (`gr`, `ml`, `U`) y genera la lista exacta de supermercado de forma semanal.
- **Historial del Bistro:** Auditoría personal de menús consumidos previamente.

### 👨‍🍳 2. Perfil Chef / Crítico (`rol: "chef"`)

Un panel de control administrativo y de ingeniería de menú a pantalla completa.

- **Ficha Técnica Digital (CRUD):** Módulo optimizado para la creación y modificación de platos, **Costo Estimado de elaboración**, descripciones comerciales e instrucciones paso a paso para el personal de cocina.
- **Desglose Dinámico de Ingredientes:** Inserción en tiempo real de insumos por receta para alimentar el algoritmo de cálculo del planificador.
- **Libro de Recetas con Filtros Inteligentes:** Buscador avanzado y selectores rápidos por ADN de plato ("Veggie", "Carnes", "Arroz/Pastas") que escanean automáticamente la estructura interna de los ingredientes.

---

## 🔑 Credenciales y Entorno de Pruebas (Evaluación Interactiva)

Para facilitar una auditoría fluida, personalizada y directa por parte del evaluador, la base de datos cuenta con perfiles precargados con nombres adaptados para la corrección.

> 💡 **Nota:** El sistema permite tanto el uso de estas credenciales sugeridas como el registro libre de nuevos usuarios desde el formulario de la interfaz seleccionando cualquiera de los dos roles.

### Accesos Sugeridos para la Corrección (Profe Nico):

| Perfil en Registro     | Nombre en Interfaz | Correo Electrónico | Contraseña | Comportamiento de la Interfaz                                                                                         |
| :--------------------- | :----------------- | :----------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Comensal / Cliente** | `Profe Nico`       | `user@bistro.com`  | `123`      | Acceso completo al flujo de cliente (Menú con Costos, Súper, Historial).                                              |
| **Chef / Crítico**     | `Profe Nico`       | `admin@bistro.com` | `123`      | Consola única de gestión. Desactiva barras y menús de cliente para control total del CRUD de Especialidades y Costos. |

---

## 🛠️ Stack Tecnológico de Grado Profesional

- **Frontend:** React (SPA), Tailwind CSS (Diseño scannable de alta fidelidad visual), React Hooks avanzados para control de estados globales.
- **Backend:** Node.js, Express (Arquitectura de API limpia, endpoints semánticos y controllers estructurados en español).
- **Seguridad y Persistencia:** Firebase Firestore (Base de datos NoSQL documental con actualizaciones atómicas) y Autenticación robusta basada en Web Tokens (JWT).
