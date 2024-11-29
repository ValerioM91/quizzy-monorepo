import { MiddlewareConsumer, Module } from "@nestjs/common"
import { OpenaiService } from "./openai.service"
import { OpenaiController } from "./openai.controller"
import { PrismaService } from "../prisma.service"
import { UsersService } from "../users/users.service"
import { CurrentUserMiddleware } from "../users/middleware/current-user"

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, PrismaService, UsersService],
})
export class OpenaiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*")
  }
}
