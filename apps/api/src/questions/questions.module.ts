import { MiddlewareConsumer, Module } from "@nestjs/common"
import { QuestionsService } from "./questions.service"
import { QuestionsController } from "./questions.controller"
import { PrismaService } from "../prisma.service"
import { CategoriesModule } from "../categories/categories.module"
import { VectorService } from "../vector.service"
import { CurrentUserMiddleware } from "../users/middleware/current-user"
import { UsersService } from "../users/users.service"

@Module({
  imports: [CategoriesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService, VectorService, UsersService],
})
export class QuestionsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*")
  }
}
