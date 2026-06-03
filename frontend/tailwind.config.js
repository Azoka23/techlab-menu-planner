/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fondos: "#F9F9F9",
        tarjetas: "#FFFFFF",
        textoPrincipal: "#1A1A1A",
        textoSecundario: "#6B7280",
        acentoChef: "#2C3E50",
      },
    },
  },
  plugins: [],
};
