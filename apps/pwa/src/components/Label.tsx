import { cn } from "../utils/cn"

type Label = React.ComponentPropsWithoutRef<"label">

const Label = ({ className, children, ...rest }: Label) => {
  return (
    <label className={cn("text-sm font-medium leading-none text-indigo11", className)} {...rest}>
      {children}
    </label>
  )
}
export default Label
