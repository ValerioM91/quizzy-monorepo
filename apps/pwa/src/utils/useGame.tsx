import { useEffect, useState } from "react"
import { randomizeChoices } from "../utils/randomizeChoices"
import { type Question } from "database"

const useGame = (questions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [choices, setChoices] = useState<string[]>([])
  const [answer, setAnswer] = useState<string | null>(null)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const question = questions[currentQuestionIndex]
  const isAnswered = answer !== null
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  useEffect(() => {
    setChoices(randomizeChoices(question))
  }, [currentQuestionIndex, question])

  const checkAnswer = (choice: string) => {
    setAnswer(choice)

    if (choice === question.correctAnswer) {
      setCorrectAnswers(oldValue => oldValue + 1)
    }
  }

  const nextQuestionHandler = () => {
    setAnswer(null)
    setCurrentQuestionIndex(curr => curr + 1)
  }

  return {
    currentQuestionIndex,
    answer,
    choices,
    correctAnswers,
    question,
    isAnswered,
    checkAnswer,
    nextQuestionHandler,
    isLastQuestion,
  }
}
export default useGame
