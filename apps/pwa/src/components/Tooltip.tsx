import { Cross2Icon } from "@radix-ui/react-icons"
import Button from "./Button"
import { cn } from "../utils/cn"

type TooltipProps = {
  children: React.ReactNode
  closeTooltip: () => void
  position?: "top" | "bottom"
}

const Tooltip = ({ children, closeTooltip, position = "bottom" }: TooltipProps) => {
  return (
    <div className="pointer-events-none fixed inset-4 z-50">
      <div
        className={cn("absolute flex w-full items-center justify-center", position === "top" ? "top-0" : "bottom-0")}
      >
        <div
          className={cn(
            "max-w-96 rounded-lg bg-white py-2 pl-3 pr-2 text-center text-sm before:absolute before:-z-10 before:h-4 before:w-4 before:-translate-x-1/2 before:rotate-45 before:bg-white",
            position === "top" ? "before:-top-2 before:right-2" : "before:-bottom-2 before:left-1/2",
          )}
        >
          <div className="flex items-start gap-1">
            {children}
            <Button
              className="pointer-events-auto h-auto min-h-0 cursor-pointer p-1 shadow-none"
              size="icon"
              variant="ghost"
              onClick={closeTooltip}
            >
              <Cross2Icon height={14} width={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Tooltip
