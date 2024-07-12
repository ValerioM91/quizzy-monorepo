import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { z } from "zod"
import { QuestionGetQuerySchema } from "api-contract/dist/schemas"
import { Prisma, Question } from "database"

@Injectable()
export class QuestionsService {
  // eslint-disable-next-line no-unused-vars
  constructor(private prisma: PrismaService) {}

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
    return await this.prisma.question.createMany({ data: questions })
  }

  async patch(id: number, question: Prisma.QuestionUpdateInput) {
    return await this.prisma.question.update({ where: { id }, data: question })
  }

  async delete(id: number) {
    return await this.prisma.question.delete({ where: { id } })
  }
}
