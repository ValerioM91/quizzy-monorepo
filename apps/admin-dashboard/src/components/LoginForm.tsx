import { useRouter } from "@tanstack/react-router"

import apiClient from "../api-client"
import { LoginSchema } from "api-contract"

import { useFormWithSchema } from "../utils/useFormWithSchema"
import Button from "./ui/Button"
import Input from "./ui/Input"

const LoginForm = () => {
  const { navigate } = useRouter()
  const { mutate, isLoading } = apiClient.authentication.login.useMutation({
    onSuccess() {
      navigate({ to: "/categories" })
    },
  })

  const { handleSubmit, register, errors } = useFormWithSchema({
    schema: LoginSchema,
  })

  if (isLoading) {
    return <div>Loading...</div> // TODO: Add loading state
  }

  return (
    <form onSubmit={handleSubmit(body => mutate({ body }))}>
      <Input
        type="email"
        id="email"
        autoComplete="email"
        required
        placeholder="Email"
        isError={!!errors.email}
        {...register("email")}
      />
      <Input
        type="password"
        id="password"
        autoComplete="current-password"
        required
        placeholder="Password"
        isError={!!errors.password}
        {...register("password")}
      />
      <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginForm
