import { Module } from "@nestjs/common"
import { QuestionsModule } from "./questions/questions.module"
import { CategoriesModule } from "./categories/categories.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"
import { OpenaiModule } from "./openai/openai.module"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "admin-client"),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    CategoriesModule,
    QuestionsModule,
    OpenaiModule,
  ],
})
export class AppModule {}
