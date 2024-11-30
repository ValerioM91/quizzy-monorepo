import { MiddlewareConsumer, Module } from "@nestjs/common"
import { ServeStaticModule } from "@nestjs/serve-static"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { join } from "path"
import { OpenaiModule } from "./openai/openai.module"
import { QuestionsModule } from "./questions/questions.module"
import { CategoriesModule } from "./categories/categories.module"
import { UsersModule } from "./users/users.module"
import cookieSession from "cookie-session"

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, "../../../", "admin-dashboard/dist"),
        serveRoot: "/admin",
      },
      {
        rootPath: join(__dirname, "../../../", "pwa/dist"),
        exclude: ["/admin"],
      },
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    UsersModule,
    CategoriesModule,
    QuestionsModule,
    OpenaiModule,
  ],
})
export class AppModule {
  // eslint-disable-next-line no-unused-vars
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          maxAge: 24 * 60 * 60 * 1000,
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          keys: [this.configService.get("COOKIE_KEY")],
        }),
      )
      .forRoutes("*")
  }
}
