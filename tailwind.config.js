/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ['var(--font-vazirmatn)', 'system-ui', 'sans-serif'],
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
