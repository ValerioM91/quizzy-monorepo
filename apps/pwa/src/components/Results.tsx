import Link from "./Link"
import Main from "./Main"

const Results = ({ correctPercentage }: { correctPercentage: number }) => {
  let content = {
    title: ["You", "Lost!"],
    description: `You answered only ${correctPercentage}% of questions correctly!`,
  }

  if (correctPercentage >= 60) {
    content = {
      title: ["You", "Win!"],
      description: `You answered ${correctPercentage}% of questions correctly!`,
    }
  }

  return (
    <Main>
      <section className="grid w-full max-w-xs">
        <div className="flex flex-col justify-center gap-10 text-center">
          <h2 className="shadow-1 -skew-y-3 skew-x-6 rounded-3xl bg-white px-6 py-8 text-4xl font-bold uppercase text-indigo11">
            {content.title[0]}
            <br />
            <span className="mt-1 text-7xl">{content.title[1]}</span>
          </h2>

          <div className="skew-x-12 rounded-xl bg-white p-2">
            <p className="-skew-x-12 font-medium text-indigo11">{content.description}</p>
          </div>

          <Link variant="amber" to="/" search={{}} className="mt-6 skew-x-12 font-semibold uppercase">
            <span className="-skew-x-12">Play again!</span>
          </Link>
        </div>
      </section>
    </Main>
  )
}
export default Results
