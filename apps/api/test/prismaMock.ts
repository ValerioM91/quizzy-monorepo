import { PrismaClient } from "database"
import { DeepMockProxy, mockDeep } from "jest-mock-extended"

export type PrismaMock = DeepMockProxy<{
  // this is needed to resolve the issue with circular types definition
  // https://github.com/prisma/prisma/issues/10203
  [K in keyof PrismaClient]: Omit<PrismaClient[K], "groupBy">
}>

export const prismaMock = mockDeep<PrismaClient>() as unknown as PrismaMock
