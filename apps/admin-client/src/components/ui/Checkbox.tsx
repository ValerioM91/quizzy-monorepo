import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "../../utils/cn"
import { FaCheck, FaXmark } from "react-icons/fa6"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { iconClassName?: string }
>(({ className, iconClassName, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "focus-visible:ring-ring group peer h-6 w-6 shrink-0 rounded-full border border-theme-blue bg-theme-pink text-white shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-theme-green-ocean",
      className,
    )}
    {...props}
  >
    <span className="flex items-center justify-center group-data-[state=checked]:hidden">
      <FaXmark className={cn("flex h-4 w-4", iconClassName)} />
    </span>
    <CheckboxPrimitive.Indicator className={cn("relative z-10 flex items-center justify-center text-current")}>
      <FaCheck className={cn("hidden h-4 w-4 group-data-[state=checked]:block", iconClassName)} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
