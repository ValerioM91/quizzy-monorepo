import { createFileRoute } from "@tanstack/react-router"
import StartScreen from "../screens/StartScreen"

export const Route = createFileRoute("/")({
  component: StartScreen,
})
