import Link from "./Link"
import { cn } from "../../utils/cn"
import { type IconType } from "react-icons"
import { BiCategory, BiQuestionMark } from "react-icons/bi"
import { GiArtificialIntelligence } from "react-icons/gi"
import { SIDENAV_INPUT_ID } from "../../config"
import { useRouterState } from "@tanstack/react-router"

const LINKS: {
  name: string
  path: string
  icon: IconType
}[] = [
  { name: "Categories", path: "/categories", icon: BiCategory },
  { name: "Questions", path: "/questions", icon: BiQuestionMark },
  { name: "Generate with AI", path: "/generate", icon: GiArtificialIntelligence },
]

const SideNav = ({ className }: { className?: string }) => {
  const {
    location: { pathname },
  } = useRouterState()

  return (
    <div
      className={cn(
        "fixed z-20 h-full max-h-screen min-w-32 -translate-x-[101%] p-5 transition-all md:relative md:translate-x-0",
        className,
      )}
    >
      <div className="flex h-full w-full flex-col space-y-4 rounded-4xl bg-base-200 px-6 py-10">
        <div className="text-center text-xl font-bold uppercase">QUIZZY</div>
        <nav>
          <ul className="space-y-2">
            {LINKS.map(({ icon: Icon, name, path }) => (
              <li key={name}>
                <Link
                  onClick={() => {
                    if (typeof document === "undefined") return
                    const input = document.getElementById(SIDENAV_INPUT_ID) as HTMLInputElement | undefined
                    input && (input.checked = false)
                  }}
                  to={path}
                  colorSchema="violet"
                  variant="ghost"
                  className={cn(
                    "items-start justify-start gap-3 rounded-full px-2 py-2 text-base font-medium text-theme-violet-light hover:bg-base-300",
                    {
                      "bg-white": pathname === path,
                    },
                  )}
                  fullWidth
                  uppercase={false}
                >
                  <Icon className="h-auto w-6 shrink-0" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SideNav
