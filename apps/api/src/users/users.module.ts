import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { AuthService } from "./auth.service"
import { PrismaService } from "../prisma.service"

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, AuthService],
})
export class UsersModule {}
