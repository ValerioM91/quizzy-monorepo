import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule } from "@nestjs/swagger"
import { openApiDocument } from "api-contract"

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  SwaggerModule.setup("docs/api", app, openApiDocument)

  await app.listen(PORT)
}
bootstrap()
