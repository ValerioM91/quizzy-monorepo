import { Test, type TestingModule } from "@nestjs/testing"
import { mockReset } from "jest-mock-extended"
import { AppModule } from "../src/app.module"
import { PrismaService } from "../src/prisma.service"
import { prismaMock } from "./prismaMock"
import { OpenaiService } from "../src/openai/openai.service"
import { openAIMock } from "./openaiMock"

export const createAppTestModule = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(prismaMock)
    .overrideProvider(OpenaiService)
    .useValue(openAIMock)
    .compile()

  mockReset(prismaMock)

  const app = moduleFixture.createNestApplication()
  await app.init()
  return app.getHttpServer()
}
