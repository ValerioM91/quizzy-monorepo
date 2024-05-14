import { createFileRoute, Outlet } from "@tanstack/react-router"
import SidenavToggle from "../components/ui/SidenavToggle"
import { SIDENAV_INPUT_ID } from "../config"
import SideNav from "../components/ui/Sidenav"

export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <div className="mx-auto h-[100dvh] w-full md:grid md:grid-cols-[20rem_1fr]">
      <div>
        <SidenavToggle />
        <SideNav className="peer-checked:translate-x-0" />
        <label
          htmlFor={SIDENAV_INPUT_ID}
          aria-label="close sidebar"
          className="fixed inset-0 z-10 hidden cursor-pointer self-stretch bg-transparent transition-all peer-checked:block peer-checked:bg-black/20 md:hidden"
        />
        <div className="flex h-10 justify-end border-b p-2 px-4 text-sm sm:text-xl md:hidden">
          <label htmlFor={SIDENAV_INPUT_ID} aria-label="open sidebar" className="text-2xl">
            HEY
          </label>
        </div>
      </div>

      <div className="flex h-[100%] flex-col overflow-y-hidden">
        <div className="overflow-auto pb-5 pt-10">
          <div className="mx-auto max-w-screen-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ),
})
