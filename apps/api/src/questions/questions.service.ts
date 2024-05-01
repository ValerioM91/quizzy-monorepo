import { Injectable } from '@nestjs/common';
import { type PrismaService } from '../prisma.service';
import { type z } from 'zod';
import { type QuestionGetQuerySchema } from 'api-contract/dist/schemas';
import { type Prisma, type Question } from 'database';

@Injectable()
export class QuestionsService {
  // eslint-disable-next-line no-unused-vars
  constructor(private prisma: PrismaService) {}

  async get({
    categoryId,
    difficulty,
    amount,
  }: z.infer<typeof QuestionGetQuerySchema>) {
    try {
      return (await this.prisma.$queryRaw`
      SELECT * FROM "Question"
      WHERE "categoryId" = ${categoryId} AND "difficulty"::text = ${difficulty}
      ORDER BY random()
      LIMIT ${amount}
      `) as Question[];
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async createMany(questions: Prisma.QuestionCreateManyInput[]) {
    return await this.prisma.question.createMany({ data: questions });
  }

  async patch(id: number, question: Prisma.QuestionUpdateInput) {
    return await this.prisma.question.update({ where: { id }, data: question });
  }

  async delete(id: number) {
    return await this.prisma.question.delete({ where: { id } });
  }
}
