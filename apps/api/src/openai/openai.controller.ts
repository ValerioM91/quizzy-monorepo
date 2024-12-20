import { Controller, UseGuards } from "@nestjs/common"
import { OpenaiService } from "./openai.service"
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest"
import { contract } from "api-contract"
import { AuthGuard } from "../guards/auth.guard"

@Controller()
export class OpenaiController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly openaiService: OpenaiService) {}

  @TsRestHandler(contract.openAI)
  @UseGuards(AuthGuard)
  async handler() {
    return tsRestHandler(contract.openAI, {
      generateMany: async ({ body }) => {
        const questions = await this.openaiService.generateWithAI(body)

        return {
          status: 200,
          body: {
            questions,
            categoryId: body.categoryId,
            difficulty: body.difficulty,
          },
        }
      },
    })
  }
}
