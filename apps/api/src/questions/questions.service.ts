import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { z } from "zod"
import { QuestionGetQuerySchema } from "api-contract/dist/schemas"
import { Prisma, Question } from "database"
import { VectorService } from "../vector.service"

@Injectable()
export class QuestionsService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private prisma: PrismaService,
    // eslint-disable-next-line no-unused-vars
    private vectorService: VectorService,
  ) {}

  async get({ categoryId, difficulty, amount }: z.infer<typeof QuestionGetQuerySchema>) {
    try {
      return (await this.prisma.$queryRaw`
      SELECT * FROM "Question"
      WHERE "categoryId" = ${categoryId} AND "difficulty"::text = ${difficulty}
      ORDER BY random()
      LIMIT ${amount}
      `) as Question[]
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getPaginated({ categoryId, difficulty, page, take = 20 }) {
    const totalPages = Math.ceil(
      (await this.prisma.question.count({
        where: { categoryId, difficulty },
      })) / take,
    )

    const questions = await this.prisma.question.findMany({
      where: { categoryId, difficulty },
      orderBy: { id: "asc" },
      skip: (page - 1) * 20,
      take,
    })

    return {
      totalPages,
      questions,
    }
  }

  async createMany(questions: Prisma.QuestionCreateManyInput[]) {
    const results = await this.prisma.question.createManyAndReturn({ data: questions })

    results.forEach(async question => {
      this.vectorService.addItem(question)
    })

    return results
  }

  async querySimilar({ text, categoryId }: { text: string; categoryId: number }) {
    return this.vectorService.querySimilar(text, categoryId)
  }

  async patch(id: number, question: Prisma.QuestionUpdateInput) {
    const updated = await this.prisma.question.update({ where: { id }, data: question })
    this.vectorService.updateItem(updated)
    return updated
  }

  async delete(id: number) {
    const deleted = await this.prisma.question.delete({ where: { id } })
    this.vectorService.deleteItem(id)
    return deleted
  }
}
