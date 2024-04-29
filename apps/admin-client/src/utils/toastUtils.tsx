import toast from "react-hot-toast"
import NotificationToast, { NotificationToastProps } from "../components/ui/NotificationToast"

const TITLE_DEFAULT = "Success"
const CONTENT_DEFAULT = "Details successfully changed"

export const showDefaultNotificationToast = (
  { title = TITLE_DEFAULT, content = CONTENT_DEFAULT, link }: Partial<Omit<NotificationToastProps, "toastElement">> = {
    title: TITLE_DEFAULT,
    content: CONTENT_DEFAULT,
  },
) => {
  toast.custom(
    toastElement => <NotificationToast toastElement={toastElement} title={title} content={content} link={link} />,
    { duration: 5000, position: "top-right" },
  )
}

export const showErrorToast = ({ title, content, link }: Omit<NotificationToastProps, "toastElement">) => {
  toast.custom(
    toastElement => <NotificationToast error toastElement={toastElement} title={title} content={content} link={link} />,
    { duration: 86400000, position: "top-right" },
  )
}
