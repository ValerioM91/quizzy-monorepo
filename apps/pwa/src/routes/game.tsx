import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import apiClient from "../api-client"
import GameScreen from "../screens/GameScreen"

const quizParamsSchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"]).catch("easy"),
  category: z.coerce.string().catch(""),
  amount: z.coerce.number().min(1).max(30).catch(10),
})

export const Route = createFileRoute("/game")({
  validateSearch: quizParamsSchema,
  loaderDeps: ({ search: { category, difficulty, amount } }) => ({ category, difficulty, amount }),
  loader: ({ deps: { category, difficulty, amount } }) =>
    apiClient.questions.get.query({ query: { categoryId: +category, difficulty, amount } }),
  component: GameScreen,
})
