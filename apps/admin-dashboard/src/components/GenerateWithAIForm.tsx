import apiClient from "../api-client"
import { useFormWithSchema } from "../utils/useFormWithSchema"
import Button from "./ui/Button"
import { type QuestionFromOpenAi } from "../types"
import { GenerateWithAISchema } from "api-contract"
import Select from "./ui/Select"
import Label from "./ui/Label"
import Input from "./ui/Input"
import LoadingBar from "./ui/LoadingBar"
import { type Difficulty } from "database"

const GenerateWithAIForm = ({
  onGenerate,
}: {
  onGenerate: React.Dispatch<
    React.SetStateAction<
      | {
          questions: QuestionFromOpenAi[]
          categoryId: number
          difficulty: Difficulty
        }
      | undefined
    >
  >
}) => {
  const { data: categories } = apiClient.category.getAll.useQuery(["category.getAll"])

  const { mutate, isLoading } = apiClient.openAI.generateMany.useMutation({
    onSuccess(data) {
      onGenerate(data.body)
    },
  })

  const { handleSubmit, register, errors } = useFormWithSchema({
    schema: GenerateWithAISchema,
  })

  if (isLoading) {
    return <LoadingBar content="Generating questions. Please wait." />
  }

  return (
    <form
      onSubmit={handleSubmit(body => mutate({ body }))}
      className="mx-auto mt-6 h-full w-full max-w-screen-sm gap-4"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="categoryId">Category</Label>
          <Select
            required
            isError={!!errors.categoryId}
            {...register("categoryId", { valueAsNumber: true })}
            id="categoryId"
            errorMessage={errors.categoryId?.message}
          >
            <option value="">Select a category</option>
            {categories?.body?.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            required
            id="difficulty"
            isError={!!errors.difficulty}
            {...register("difficulty")}
            errorMessage={errors.difficulty?.message}
          >
            <option value="">Select a difficulty</option>

            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="number">Number of Questions</Label>
          <Input
            required
            id="numberOfQuestions"
            type="number"
            min={0}
            max={30}
            isError={!!errors.numberOfQuestions}
            {...register("numberOfQuestions", { valueAsNumber: true })}
            errorMessage={errors.numberOfQuestions?.message}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button disabled={isLoading} type="submit">
          Generate
        </Button>
      </div>
    </form>
  )
}

export default GenerateWithAIForm
