import { BadRequestException, Controller, UseGuards } from "@nestjs/common"
import { QuestionsService } from "./questions.service"
import { contract } from "api-contract"
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest"
import { CategoriesService } from "../categories/categories.service"
import { AuthGuard } from "../guards/auth.guard"

@Controller()
export class QuestionsController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly questionsService: QuestionsService,
    // eslint-disable-next-line no-unused-vars
    private readonly categoriesService: CategoriesService,
  ) {}

  @TsRestHandler(contract.questions.get)
  async get() {
    return tsRestHandler(contract.questions.get, async ({ query }) => {
      const questions = await this.questionsService.get(query)
      return {
        status: 200,
        body: questions,
      }
    })
  }

  @TsRestHandler(contract.questions.getPaginated)
  @UseGuards(AuthGuard)
  async getPaginated() {
    return tsRestHandler(contract.questions.getPaginated, async ({ query }) => {
      return {
        status: 200,
        body: await this.questionsService.getPaginated(query),
      }
    })
  }

  @TsRestHandler(contract.questions.querySimilar)
  @UseGuards(AuthGuard)
  async querySimilar() {
    return tsRestHandler(contract.questions.querySimilar, async ({ query }) => {
      const results = await this.questionsService.querySimilar(query)
      return {
        status: 200,
        body: results,
      }
    })
  }

  @TsRestHandler(contract.questions.create)
  @UseGuards(AuthGuard)
  async create() {
    return tsRestHandler(contract.questions.create, async ({ body }) => {
      const category = await this.categoriesService.get(body.categoryId)
      if (!category) {
        throw new BadRequestException("Category not found")
      }

      const [question] = await this.questionsService.createMany([body])

      return {
        status: 201,
        body: question,
      }
    })
  }

  @TsRestHandler(contract.questions.createMany)
  @UseGuards(AuthGuard)
  async createMany() {
    return tsRestHandler(contract.questions.createMany, async ({ body }) => {
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
    })
  }

  @TsRestHandler(contract.questions.patch)
  @UseGuards(AuthGuard)
  async patch() {
    return tsRestHandler(contract.questions.patch, async ({ body, params: { id } }) => {
      const updatedQuestion = await this.questionsService.patch(id, body)

      return {
        status: 200,
        body: updatedQuestion,
      }
    })
  }

  @TsRestHandler(contract.questions.delete)
  @UseGuards(AuthGuard)
  async delete() {
    return tsRestHandler(contract.questions.delete, async ({ params: { id } }) => {
      await this.questionsService.delete(id)

      return {
        status: 204,
        body: undefined,
      }
    })
  }
}
