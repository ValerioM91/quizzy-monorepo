import { type VariantProps } from "class-variance-authority"
import { Link as RouterLink, type LinkProps } from "@tanstack/react-router"
import { cn } from "../utils/cn"
import { buttonVariants } from "../utils/buttonVariants"

type Link = LinkProps & VariantProps<typeof buttonVariants> & { className?: string }

const Link = ({ className, variant, size, ...props }: Link) => {
  return <RouterLink className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export default Link
