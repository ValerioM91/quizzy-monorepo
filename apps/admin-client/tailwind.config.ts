import { type Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        "base-100": "#F7F9FB",
        "base-200": "#EAEDF1",
        "base-300": "#D4D2EC",
        "base-400": "#B7B4BE",
        "content-base": "#232323",
        "content-dark": "#626262",
        "content-extra-light": "#C2C2C2",
        "content-light": "#9C9C9C",
        "content-neutral": "#757575",
        "theme-antique-pink": "#C26E8A",
        "theme-blue": "#1C1661",
        "theme-blue-dark": "#204066",
        "theme-blue-light": "#E3EFFD",
        "theme-blue-royal": "#615EF8",
        "theme-coral": "#FF6838",
        "theme-green": "#225D5D",
        "theme-green-light": "#EBF3F3",
        "theme-green-ocean": "#3CAB90",
        "theme-indigo": "#6248DB",
        "theme-orange": "#FFAF36",
        "theme-pink": "#EF0D6C",
        "theme-pink-dark": "#7C2643",
        "theme-pink-light": "#F9EDF1",
        "theme-purple": "#C23CE3",
        "theme-sky": "#5E9FF8",
        "theme-teal": "#64C9CB",
        "theme-teal-light": "#C3F0F1",
        "theme-violet": "#8277FF",
        "theme-violet-light": "#63608A",
        "theme-yellow": "#F8D849",
      },
      keyframes: {
        "left-to-right": {
          "0%": {
            transform: "translateX(-150%)",
          },
          "100%": {
            transform: "translateX(450%)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
