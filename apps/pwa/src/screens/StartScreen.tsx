import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Select"
import Label from "../components/Label"
import Main from "../components/Main"
import Link from "../components/Link"
import { cn } from "../utils/cn"
import apiClient from "../api-client"
import { useAudio } from "../components/AudioProvider"
import type { Difficulty } from "database"

const StartScreen = () => {
  const [category, setCategory] = useState<string>()
  const [amount, setAmount] = useState(10)
  const [selectOpen, setSelectOpen] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>()

  const { setGameTrack } = useAudio()
  const navigate = useNavigate()

  useEffect(() => {
    setGameTrack("menu")
  }, [setGameTrack])

  const { data: categories } = apiClient.category.getAll.useQuery(["category.getAll"], undefined, {
    staleTime: 1000 * 60 * 60,
    queryKey: ["category.getAll"],
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate({ to: "/Game", search: { amount, category, difficulty } })
  }

  return (
    <Main>
      <h2 className="skewed-heading mb-4 px-12 py-8">QUIZZY</h2>

      <form className="grid w-full max-w-md gap-6 rounded-lg p-10" onSubmit={onSubmit}>
        <div className="flex flex-col rounded-lg ">
          <Label
            htmlFor="category"
            className="inline-block skew-x-6 self-center rounded-t-md border-b border-white bg-white px-4 py-2"
          >
            <span className="inline-block -skew-x-6">Select a category</span>
          </Label>
          <Select name="category" onValueChange={val => setCategory(val)} onOpenChange={open => setSelectOpen(open)}>
            <SelectTrigger id="category" className="capitalize" aria-label="Category">
              <SelectValue placeholder="Select category" className="placeholder:text-red-600" />
            </SelectTrigger>
            <SelectContent style={{ width: "var(--radix-select-trigger-width)" }}>
              {categories?.body.map(category => (
                <SelectItem key={category.id} value={category.id.toString()} className="capitalize">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <Label
            htmlFor="difficulty"
            className="inline-block skew-x-6 self-center rounded-t-md border-b border-white bg-white px-4 py-2"
          >
            <span className="inline-block -skew-x-6">Select a difficulty</span>
          </Label>
          <Select
            name="difficulty"
            value={difficulty}
            onValueChange={(difficulty: Difficulty) => setDifficulty(difficulty)}
            onOpenChange={open => setSelectOpen(open)}
          >
            <SelectTrigger id="difficulty" className="capitalize" aria-label="Difficulty">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {["easy", "medium", "hard"].map(difficulty => (
                <SelectItem key={difficulty} value={difficulty} className="capitalize">
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <Label
            htmlFor="amount"
            className="inline-block skew-x-6 self-center rounded-t-md border-b border-white bg-white px-4 py-2"
          >
            <span className="inline-block -skew-x-6">Number of questions</span>
          </Label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="inline-flex h-12 w-full items-center justify-between gap-1 rounded-md bg-white px-3 py-2 text-sm leading-none text-indigo9 shadow-lg shadow-indigo12/50 transition-all hover:bg-mauve3 focus:bg-white data-[placeholder]:text-indigo9"
            min={1}
            max={20}
            value={amount}
            onChange={e => setAmount(+e.target.value)}
          />
        </div>

        <Link
          to="/game"
          variant="amber"
          search={{ amount, category, difficulty }}
          className={cn("mt-6 skew-x-6 uppercase", selectOpen ? "pointer-events-none" : "pointer-events-auto")}
        >
          <span className="-skew-x-6">Start Game</span>
        </Link>
      </form>
    </Main>
  )
}

export default StartScreen
