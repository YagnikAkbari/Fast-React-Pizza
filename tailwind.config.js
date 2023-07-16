/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      colors: {
        custom: "#147946",
      },
      fontSize: {
        huge: ["25rem", { lineHight: "2" }],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  singleQuote: true,
  plugins: [],
};
