import { MiddlewareConsumer, Module } from "@nestjs/common"
import { CategoriesService } from "./categories.service"
import { CategoriesController } from "./categories.controller"
import { PrismaService } from "../prisma.service"
import { CurrentUserMiddleware } from "../users/middleware/current-user"
import { UsersService } from "../users/users.service"

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, UsersService],
  exports: [CategoriesService],
})
export class CategoriesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*")
  }
}
