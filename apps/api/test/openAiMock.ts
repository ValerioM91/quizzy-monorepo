import { DeepMockProxy, mockDeep } from "jest-mock-extended"
import OpenAI from "openai"

export type OpenAIMock = DeepMockProxy<{
  // this is needed to resolve the issue with circular types definition
  // https://github.com/prisma/prisma/issues/10203
  [K in keyof OpenAI]: Omit<OpenAI[K], "groupBy">
}>

export const openAIMock = mockDeep<OpenAI>() as unknown as OpenAIMock
