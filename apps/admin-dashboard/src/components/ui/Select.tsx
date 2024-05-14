import { cn } from "../../utils/cn"
import RequiredLabel from "./RequiredLabel"
import { forwardRef } from "react"
import InputErrorMessage from "./InputErrorMessage"

type SelectProps = React.ComponentPropsWithRef<"select"> & {
  containerClassName?: string
  isError?: boolean
  errorMessage?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, containerClassName, required, isError, errorMessage, ...rest }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <select
          ref={ref}
          className={cn(
            "relative z-10 block w-full appearance-none rounded-2xl border border-base-300 bg-transparent bg-[url(../assets/chevron.svg)] bg-[calc(100%-1.5rem)] bg-no-repeat px-4 py-3 text-lg",
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

Select.displayName = "Select"

export default Select
