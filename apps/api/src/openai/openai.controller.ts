import { Controller } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';

@Controller()
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @TsRestHandler(contract.openAI)
  async handler() {
    return tsRestHandler(contract.openAI, {
      generateMany: async ({ body }) => {
        const questions = await this.openaiService.generateWithAI(body);

        return {
          status: 200,
          body: {
            questions,
            categoryId: body.categoryId,
            difficulty: body.difficulty,
          },
        };
      },
    });
  }
}
