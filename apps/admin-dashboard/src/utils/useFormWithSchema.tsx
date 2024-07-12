import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormProps } from "react-hook-form"
import { type z } from "zod"

export function useFormWithSchema<T extends z.Schema>({
  schema,
  ...rest
}: {
  schema: T
} & Omit<UseFormProps<z.infer<T>>, "resolver">) {
  const form = useForm<z.infer<T>>({
    ...rest,
    resolver: zodResolver(schema),
  })

  return {
    ...form,
    errors: form.formState.errors,
    defaultValues: form.formState.defaultValues,
  }
}
