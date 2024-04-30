import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        violet: "bg-violet9 text-white hover:bg-violet9/90",
        indigo: "bg-indigo9 text-white hover:bg-indigo9/90",
        red: "bg-red9 text-white",
        tomato: "bg-red9 text-white",
        ruby: "bg-ruby9 text-white",
        yellow: "bg-yellow10",
        amber: "bg-amber9 hover:bg-amber10/90 text-indigo12",
        green: "bg-green8 text-white",
        teal: "bg-teal9 text-white",
        mauve: "bg-mauve9 text-white hover:bg-mauve9/90",
        purple: "bg-purple9 text-white hover:bg-purple9/90",
        gray: "bg-gray-100 hover:bg-gray-200",
        light: "bg-indigo3 text-indigo11 hover:bg-indigo5/90",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100/90",
        white: "bg-white text-gray-700 hover:bg-gray-100/90",
      },
      size: {
        default: "min-h-10 p-4 rounded-xl",
        sm: "min-h-9 rounded-md px-3",
        lg: "min-h-11 rounded-md px-8",
        icon: "h-10 w-10 rounded-md",
      },
      shadow: {
        default: "shadow-lg shadow-indigo12/50",
        none: "",
      },
    },
    defaultVariants: {
      variant: "indigo",
      size: "default",
      shadow: "default",
    },
  },
)
