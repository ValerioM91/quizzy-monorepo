import { createLazyFileRoute } from "@tanstack/react-router"
import AddQuestionForm from "../../components/AddQuestionForm"

export const Route = createLazyFileRoute("/_dashboard/add-question")({
  component: AddQuestionPage,
})

function AddQuestionPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Add Question</h1>
      <AddQuestionForm />
    </div>
  )
}
