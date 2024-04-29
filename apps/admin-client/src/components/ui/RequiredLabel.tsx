import { cn } from "../../utils/cn"

const RequiredLabel = ({ className, isError }: { className?: string; isError?: boolean }) => {
  return (
    <span
      className={cn(
        "absolute -top-6 bottom-0 right-0 z-0 h-16 rounded-2xl bg-theme-pink-light px-4 py-1.5 text-xs font-bold uppercase text-theme-pink",
        { "bg-theme-pink text-white": isError },
        className,
      )}
    >
      Required
    </span>
  )
}
export default RequiredLabel
