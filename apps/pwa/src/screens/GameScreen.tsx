import Game from "../components/Game"
import { Link, useLoaderData } from "@tanstack/react-router"

import Main from "../components/Main"

const GameScreen = () => {
  const data = useLoaderData({ from: "/game" })

  if (data.status !== 200) {
    return (
      <Main>
        <div className="flex max-w-md flex-col justify-center gap-10 rounded-lg bg-white p-10 text-center">
          <p>No questions found for selected options. Please try again with a different combination.</p>
          <Link to="/">Choose your quiz</Link>
        </div>
      </Main>
    )
  }

  return <Game questions={data.body} />
}
export default GameScreen
