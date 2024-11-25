import { toast, type Toast } from "react-hot-toast"
import { CgClose } from "react-icons/cg"
import Link from "./Link"
import Button from "./Button"
import { IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5"
import { cn } from "../../utils/cn"
import type { LinkProps } from "@tanstack/react-router"

export type NotificationToastProps = {
  toastElement: Toast
  title: string
  content?: string | React.ReactNode
  link?: LinkProps["to"]
  error?: boolean
}

const NotificationToast = ({ toastElement, title, content, link, error }: NotificationToastProps) => {
  const Icon = error ? IoAlertCircleOutline : IoCheckmarkCircleOutline

  return (
    <div
      className={cn(
        "rounded-2xl bg-theme-teal-light px-6 py-4 shadow-md",
        toastElement.visible ? "animate-enter" : "animate-leave",
        { "bg-theme-pink-light": error },
      )}
    >
      <div className="flex items-center justify-between gap-2.5">
        <Icon className="mr-2 h-6 w-6" />

        <div className="mr-3">
          <div className="text-lg font-bold">{title}</div>
          <div className="max-w-prose text-sm">{content}</div>
        </div>

        {link && (
          <Link to={link} colorSchema={error ? "pink" : "teal"} onClick={() => toast.dismiss(toastElement.id)}>
            Show Me
          </Link>
        )}

        <Button
          aria-label="Dismiss notification"
          variant="outline"
          colorSchema={error ? "pink" : "teal"}
          size="iconLg"
          onClick={() => toast.dismiss(toastElement.id)}
        >
          <CgClose />
        </Button>
      </div>
    </div>
  )
}

export default NotificationToast
