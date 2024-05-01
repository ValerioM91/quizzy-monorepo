import { Module } from "@nestjs/common"
import { OpenaiService } from "./openai.service"
import { OpenaiController } from "./openai.controller"
import { PrismaService } from "../prisma.service"

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, PrismaService],
})
export class OpenaiModule {}
