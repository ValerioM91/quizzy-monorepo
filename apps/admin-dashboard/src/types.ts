import { type Question } from "database"

export type QuestionFromOpenAi = Pick<Question, "question" | "correctAnswer" | "incorrectAnswers">
