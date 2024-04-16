import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { z } from 'zod';
import { QuestionGetQuerySchema } from 'api-contract/dist/schemas';
import { Prisma } from 'database';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async get({
    categoryId,
    difficulty,
  }: z.infer<typeof QuestionGetQuerySchema>) {
    return await this.prisma.question.findMany({
      where: { categoryId, difficulty },
    });
  }

  async createMany(questions: Prisma.QuestionCreateManyInput[]) {
    return await this.prisma.question.createMany({ data: questions });
  }

  async delete(id: number) {
    return await this.prisma.question.delete({ where: { id } });
  }
}
