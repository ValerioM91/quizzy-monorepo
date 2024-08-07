import { BadRequestException, Controller } from "@nestjs/common"
import { QuestionsService } from "./questions.service"
import { contract } from "api-contract"
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest"
import { CategoriesService } from "../categories/categories.service"

@Controller()
export class QuestionsController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly questionsService: QuestionsService,
    // eslint-disable-next-line no-unused-vars
    private readonly categoriesService: CategoriesService,
  ) {}

  @TsRestHandler(contract.questions)
  async handler() {
    return tsRestHandler(contract.questions, {
      get: async ({ query }) => {
        const questions = await this.questionsService.get(query)
        return {
          status: 200,
          body: questions,
        }
      },

      // TODO: Implement admin-only protected route
      getPaginated: async ({ query }) => {
        return {
          status: 200,
          body: await this.questionsService.getPaginated(query),
        }
      },

      querySimilar: async ({ query }) => {
        const results = await this.questionsService.querySimilar(query)
        return {
          status: 200,
          body: results,
        }
      },

      create: async ({ body }) => {
        const category = await this.categoriesService.get(body.categoryId)

        if (!category) {
          throw new BadRequestException("Category not found")
        }

        const [question] = await this.questionsService.createMany([body])

        return {
          status: 201,
          body: question,
        }
      },

      createMany: async ({ body }) => {
        const category = await this.categoriesService.get(body.categoryId)

        if (!category) {
          throw new BadRequestException("Category not found")
        }

        await this.questionsService.createMany(
          body.questions.map(q => ({
            question: q.question,
            correctAnswer: q.correctAnswer,
            incorrectAnswers: q.incorrectAnswers,
            categoryId: body.categoryId,
            difficulty: body.difficulty,
          })),
        )

        return {
          status: 201,
          body: { success: true },
        }
      },

      patch: async ({ body, params: { id } }) => {
        const updatedQuestion = await this.questionsService.patch(id, body)

        return {
          status: 200,
          body: updatedQuestion,
        }
      },

      delete: async ({ params: { id } }) => {
        await this.questionsService.delete(id)

        return {
          status: 204,
          body: undefined,
        }
      },
    })
  }
}
