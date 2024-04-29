import { createPortal } from "react-dom"
import { cn } from "../../utils/cn"
import FocusLock from "react-focus-lock"
import { useCallback, useEffect } from "react"

const Modal = ({
  children,
  closeModal,
  modalLabel,
  className,
}: {
  children: React.ReactNode
  closeModal: () => void
  modalLabel: string
  className?: string
}) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        closeModal()
      }
    },
    [closeModal],
  )

  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])

  return createPortal(
    <FocusLock>
      <div className="fixed inset-0 z-40 bg-theme-blue/30" aria-hidden="true"></div>
      <div
        className="fixed inset-0 z-50 mx-4 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"
        onClick={e => {
          e.target === e.currentTarget && closeModal()
        }}
        tabIndex={-1}
      >
        <div
          className={cn(
            "rounded-4xl relative mx-auto flex max-h-full w-full max-w-xl flex-col border-0 bg-white p-8 shadow-lg outline-none focus:outline-none lg:p-12",
            className,
          )}
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          aria-label={modalLabel}
        >
          {children}
        </div>
      </div>
    </FocusLock>,
    document.body,
  )
}
export default Modal
