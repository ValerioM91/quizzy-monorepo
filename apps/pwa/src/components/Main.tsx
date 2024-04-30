import { cn } from "../utils/cn"
import { getDeviceType } from "../utils/deviceInfo"

const Main = ({ children }: { children: React.ReactNode }) => {
  const isPhone = getDeviceType() === "iPhone"
  return (
    <main
      className={cn(
        "relative mx-auto flex w-full flex-col items-center justify-center bg-pattern p-4",
        isPhone ? "min-h-svh" : "min-h-screen",
      )}
    >
      {children}
    </main>
  )
}
export default Main
