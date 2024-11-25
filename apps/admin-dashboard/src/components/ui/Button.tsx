import { type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

import { buttonStyles } from "../../utils/buttonVariants"
import { cn } from "../../utils/cn"

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonStyles> & {
    isSubmitting?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, colorSchema, fullWidth, uppercase, size, disabled, isSubmitting, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          buttonStyles({ variant, colorSchema, fullWidth, uppercase, size, disabled }),
          { "pointer-events-none": isSubmitting },
          className,
        )}
        disabled={disabled || isSubmitting}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
