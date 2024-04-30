import type { Question } from "database"

export const randomizeChoices = (question: Question) => {
  const answers = [question.correctAnswer, ...question.incorrectAnswers]
  const randomIndex = Math.floor(Math.random() * 4)
  ;[answers[randomIndex], answers[0]] = [answers[0], answers[randomIndex]]
  return answers
}
