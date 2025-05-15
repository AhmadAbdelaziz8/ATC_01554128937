/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
        },
        secondary: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
        },
        dark: {
          background: "#0F172A",
          surface: "#1E293B",
          text: "#F8FAFC",
          "text-secondary": "#CBD5E1",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
      },
      backgroundImage: {
        "dark-gradient": "linear-gradient(to bottom, #0f172a, #1e3a8a)",
      },
    },
  },
  plugins: [],
};
