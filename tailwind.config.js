/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF5F5",
          100: "#FFE3E3",
          200: "#FFC9C9",
          300: "#FFA8A8",
          400: "#FF8787",
          500: "#FA5252",
          600: "#C62828",
          700: "#A61E1E",
          800: "#861818",
          900: "#5F0E0E",
        },
        accent: {
          yellow: "#FBC02D",
        },
        espanha: {
          red: "#C60B1E",
          yellow: "#FFC400",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
