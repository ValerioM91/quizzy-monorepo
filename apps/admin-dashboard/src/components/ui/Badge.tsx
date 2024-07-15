import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      colorSchema: {
        blue: "bg-theme-blue-royal text-white",
        green: "bg-theme-green-ocean text-white",
      },
    },
    defaultVariants: {
      colorSchema: "blue",
    },
  },
)

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

export const Badge = ({ className, colorSchema, ...props }: BadgeProps) => {
  return <div className={cn(badgeVariants({ colorSchema }), className)} {...props} />
}

export default Badge
