import { cva } from "class-variance-authority"

export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 font-bold transition-[background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "rounded-2xl border",
        outline: "rounded-2xl border",
        ghost: "rounded-2xl border",
        link: "hover:underline disabled:hover:no-underline",
      },
      colorSchema: {
        blue: "text-theme-blue border-theme-blue hover:bg-theme-blue/10 focus-visible:outline-theme-blue",
        purple: "text-theme-purple border-theme-purple hover:bg-theme-purple/10 focus-visible:outline-theme-purple",
        pink: "text-theme-pink border-theme-pink hover:bg-theme-pink/10 focus-visible:outline-theme-pink",
        teal: "text-theme-teal border-theme-teal hover:bg-theme-teal/10 focus-visible:outline-theme-teal",
        violet: "text-theme-violet border-theme-violet hover:bg-theme-violet/10 focus-visible:outline-theme-violet",
        "violet-light":
          "text-theme-violet-light border-theme-violet-light hover:bg-theme-violet-light/10 focus-visible:outline-theme-violet-light",
        neutral: "text-content-base border-base-300 hover:bg-theme-blue/10 focus-visible:outline-theme-blue",
        "content-dark": "text-content-dark border-content-dark hover:bg-theme-blue/10 focus-visible:outline-theme-blue",
        whitePink: "",
        whitePurple: "",
      },
      disabled: {
        true: "cursor-not-allowed border-base-100 text-content-neutral bg-base-100 hover:bg-base-100",
      },
      fullWidth: {
        true: "w-full",
      },
      size: {
        default: "px-5 py-4 text-sm leading-none",
        xs: "px-2 py-2 text-xs leading-none rounded",
        iconXs: "rounded text-sm w-6 h-6 px-1 py-1",
        iconSm: "rounded text-sm w-7 h-7 px-1 py-1",
        iconMd: "rounded-md text-base w-9 h-9 px-2 py-2",
        iconLg: "text-lg w-12 h-12 px-3 py-3",
      },
      uppercase: {
        true: "uppercase",
      },
    },
    defaultVariants: {
      variant: "solid",
      colorSchema: "violet",
      size: "default",
      fullWidth: false,
      uppercase: true,
      disabled: false,
    },
    compoundVariants: [
      {
        variant: "ghost",
        className: "border-transparent",
      },
      {
        variant: "link",
        className: "bg-transparent p-0 hover:bg-transparent",
      },
      {
        variant: "solid",
        colorSchema: "blue",
        disabled: false,
        className: "bg-theme-blue border-theme-blue text-white hover:bg-theme-blue/80 focus-visible:outline-theme-blue",
      },
      {
        variant: "solid",
        colorSchema: "purple",
        disabled: false,
        className:
          "bg-theme-purple border-theme-purple text-white hover:bg-theme-purple/80 focus-visible:outline-theme-purple",
      },
      {
        variant: "solid",
        colorSchema: "pink",
        disabled: false,
        className: "bg-theme-pink border-theme-pink text-white hover:bg-theme-pink/80 focus-visible:outline-theme-pink",
      },
      {
        variant: "solid",
        colorSchema: "teal",
        disabled: false,
        className: "bg-theme-teal border-theme-teal text-white hover:bg-theme-teal/80 focus-visible:outline-theme-teal",
      },
      {
        variant: "solid",
        colorSchema: "violet",
        disabled: false,
        className:
          "bg-theme-violet border-theme-violet text-white hover:bg-theme-violet/80 focus-visible:outline-theme-violet",
      },
      {
        variant: "solid",
        colorSchema: "violet-light",
        disabled: false,
        className:
          "bg-theme-violet-light border-theme-violet-light text-white hover:bg-theme-violet-light/80 focus-visible:outline-theme-violet-light",
      },
      {
        variant: "solid",
        colorSchema: "neutral",
        disabled: false,
        className: "bg-base-200 border-base-200 text-theme-blue hover:bg-base-300/80",
      },
      {
        variant: "solid",
        colorSchema: "whitePink",
        disabled: false,
        className:
          "bg-white border-white text-theme-pink hover:opacity-80 transition-opacity focus-visible:outline-theme-pink",
      },
      {
        variant: "solid",
        colorSchema: "whitePurple",
        disabled: false,
        className:
          "bg-white border-white text-theme-purple hover:opacity-80 transition-opacity focus-visible:outline-theme-purple",
      },
      {
        variant: "solid",
        colorSchema: "content-dark",
        disabled: false,
        className:
          "bg-content-dark border-content-dark text-white hover:bg-content-dark/80 focus-visible:outline-content-dark",
      },
    ],
  },
)
