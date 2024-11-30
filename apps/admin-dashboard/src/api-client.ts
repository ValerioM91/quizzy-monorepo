import { initQueryClient } from "@ts-rest/react-query"
import { contract } from "api-contract"

const apiClient = initQueryClient(contract, {
  baseHeaders: {},
  credentials: "include",
  baseUrl: "",
})

export default apiClient
