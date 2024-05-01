import { Module } from "@nestjs/common"
import { QuestionsService } from "./questions.service"
import { QuestionsController } from "./questions.controller"
import { PrismaService } from "../prisma.service"
import { CategoriesModule } from "../categories/categories.module"

@Module({
  imports: [CategoriesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService],
})
export class QuestionsModule {}
