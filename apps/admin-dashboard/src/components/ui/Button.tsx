import { type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

import { buttonStyles } from "../../utils/buttonVariants"
import { cn } from "../../utils/cn"

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonStyles>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, colorSchema, fullWidth, uppercase, size, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(buttonStyles({ variant, colorSchema, fullWidth, uppercase, size, disabled }), className)}
        disabled={disabled}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
