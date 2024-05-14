import { zodResolver } from "@hookform/resolvers/zod"
import { type DefaultValues, useForm } from "react-hook-form"
import { type z } from "zod"

export function useFormWithSchema<T extends z.Schema>({
  schema,
  defaultValues: initialValues,
}: {
  schema: T
  defaultValues?: DefaultValues<z.infer<T>>
}) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  })

  return {
    ...form,
    errors: form.formState.errors,
    defaultValues: form.formState.defaultValues,
  }
}
