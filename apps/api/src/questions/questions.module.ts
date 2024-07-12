import { Module } from "@nestjs/common"
import { QuestionsService } from "./questions.service"
import { QuestionsController } from "./questions.controller"
import { PrismaService } from "../prisma.service"
import { CategoriesModule } from "../categories/categories.module"
import { VectorService } from "../vector.service"

@Module({
  imports: [CategoriesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService, VectorService],
})
export class QuestionsModule {}
