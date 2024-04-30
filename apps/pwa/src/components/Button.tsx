import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../utils/cn"
import { buttonVariants } from "../utils/buttonVariants"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = ({ className, variant, size, shadow, ...props }: ButtonProps) => {
  return <button className={cn(buttonVariants({ variant, size, shadow, className }))} {...props} />
}

export default Button
