import { cn } from "../../utils/cn"

type Label = React.ComponentPropsWithoutRef<"label">

const Label = ({ className, children, ...rest }: Label) => {
  return (
    <label className={cn("mb-2 inline-block font-bold uppercase", className)} {...rest}>
      {children}
    </label>
  )
}
export default Label
