const InputErrorMessage = ({ errorMessage }: { errorMessage?: string }) => {
  if (!errorMessage) return null

  return <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
}
export default InputErrorMessage
