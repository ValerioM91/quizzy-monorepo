import { useState } from "react"
import useGame from "../utils/useGame"
import { HomeIcon } from "@radix-ui/react-icons"
import type { Question } from "database"

import Main from "./Main"
import Button from "./Button"
import Results from "./Results"
import Link from "./Link"

const Game = ({ questions }: { questions: Question[] }) => {
  const {
    answer,
    checkAnswer,
    choices,
    correctAnswers,
    currentQuestionIndex,
    isAnswered,
    nextQuestionHandler,
    question,
    isLastQuestion,
  } = useGame(questions)

  const [showResults, setShowResults] = useState(false)

  if (showResults) {
    return <Results correctPercentage={+((correctAnswers / questions.length) * 100).toFixed(0)} />
  }

  return (
    <Main>
      <section className="grid w-full max-w-sm rounded-lg text-indigo11">
        <div className="flex min-h-[420px] flex-col border-b p-2 pb-6 sm:pb-10">
          <div className="mb-4 flex items-center justify-between">
            <Link to="/" search={{}} variant="light" size="icon" aria-label="Go Back" className="skew-x-6 text-3xl">
              <HomeIcon height={20} width={20} className="-skew-x-6" />
            </Link>

            <p className="skew-x-12 rounded-lg bg-white px-2 py-1 text-xs shadow-lg shadow-indigo12/50">
              <span className="inline-block -skew-x-12">
                Correct answers: {correctAnswers}/{currentQuestionIndex + 1}
              </span>
            </p>
          </div>

          <div className="flex min-h-36 grow skew-x-6 items-center justify-center rounded-2xl bg-white p-6 shadow-lg shadow-indigo12/50 sm:p-8">
            <h2
              className="-skew-x-6 text-center font-semibold leading-tight sm:text-lg"
              dangerouslySetInnerHTML={{ __html: question.question }}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:mt-10 sm:gap-6">
            {choices.map((choice, index) => (
              <Button
                key={index}
                variant={!!answer && choice === question.correctAnswer ? "teal" : choice === answer ? "tomato" : "gray"}
                className="skew-x-12 rounded-xl p-4"
                disabled={isAnswered}
                onClick={() => checkAnswer(choice)}
              >
                <span className="-skew-x-12" dangerouslySetInnerHTML={{ __html: choice }} />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center p-2 py-4 sm:py-6">
          {isLastQuestion ? (
            <Button variant="amber" className="w-full skew-x-12 capitalize" onClick={() => setShowResults(true)}>
              <span className="-skew-x-12">Show Results</span>
            </Button>
          ) : (
            <Button
              variant="amber"
              className="w-full skew-x-12 uppercase"
              onClick={nextQuestionHandler}
              shadow="default"
            >
              <span className="-skew-x-12">next question</span>
            </Button>
          )}
        </div>
      </section>
    </Main>
  )
}
export default Game
