import { cn } from "../../utils/cn"

const LoadingBar = ({ content }: { content: string }) => {
  return (
    <div className="space-y-8 rounded-4xl bg-base-100 p-12">
      <p className="text-lg">{content}</p>
      <div className="relative h-8 w-full rounded-full border border-theme-blue p-0.5">
        <div
          className={cn(
            "h-full w-full overflow-hidden rounded-full",
            "after:animate-infinite after:z-10 after:block after:h-full after:w-[25%] after:animate-[left-to-right_2s_infinite_linear] after:rounded-full after:bg-theme-pink",
          )}
        />
      </div>
    </div>
  )
}
export default LoadingBar
