import { Link as TanLink, type LinkProps } from "@tanstack/react-router"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils/cn"
import { buttonStyles } from "../../utils/buttonVariants"

export type Link = React.ComponentProps<typeof TanLink> &
  VariantProps<typeof buttonStyles> & {
    children?: React.ReactNode
    className?: string
    to: LinkProps["to"]
  }

const Link = ({ children, to, className, variant, colorSchema, fullWidth, uppercase, size, ...rest }: Link) => {
  return (
    <TanLink
      to={to}
      className={cn(buttonStyles({ variant, colorSchema, fullWidth, uppercase, size }), className)}
      {...rest}
    >
      {children}
    </TanLink>
  )
}

export default Link
