/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1440px",
      },
      colors: {
        primary: "#59B17A",
        "primary-light": "#E7F1ED",
        "primary-dark": "#3F7D55",
        bg: "#F7F8FA",
        "bg-dark": "#1D1E21",
        surface: "#FFFFFF",
        text: "#1D1E21",
        "text-secondary": "#6B7280",
        "text-light": "#9CA3AF",
        border: "#E5E7EB",
        "border-light": "#F3F4F6",
        danger: "#E74040",
        "danger-light": "#FDE8E8",
        warning: "#F59E0B",
        "warning-light": "#FEF3C7",
        info: "#3B82F6",
        "info-light": "#DBEAFE",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
