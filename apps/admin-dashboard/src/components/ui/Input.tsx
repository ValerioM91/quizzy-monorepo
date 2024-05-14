import { forwardRef } from "react"
import { cn } from "../../utils/cn"
import RequiredLabel from "./RequiredLabel"
import InputErrorMessage from "./InputErrorMessage"

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  containerClassName?: string
  isError?: boolean
  errorMessage?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, required, isError, errorMessage, ...rest }, ref) => {
    return (
      <div className={cn("relative w-full", containerClassName)}>
        <input
          data-1p-ignore // This disables 1Password from auto-filling the input
          data-lpignore // This disables LastPass from auto-filling the input
          ref={ref}
          className={cn(
            "relative z-10 block w-full rounded-2xl border border-base-300 bg-white px-5 py-3 placeholder:text-content-light focus:border-theme-blue focus:ring-theme-blue",
            { "border-theme-pink focus-visible:outline-theme-pink": isError },
            className,
          )}
          {...rest}
        />
        {required && <RequiredLabel isError={isError} />}
        <InputErrorMessage errorMessage={errorMessage} />
      </div>
    )
  },
)
Input.displayName = "Input"

export default Input
