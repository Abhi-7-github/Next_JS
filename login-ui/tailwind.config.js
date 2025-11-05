/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ includes App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ includes API if any
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ optional
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
