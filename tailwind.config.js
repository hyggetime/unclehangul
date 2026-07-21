/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F2F2F0",
        foreground: "#111111",
        border: "#D9D9D3",
        accent: "#FF4B3E",
      },
    },
  },
  plugins: [],
};
