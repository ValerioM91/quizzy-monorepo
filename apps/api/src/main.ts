import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule } from "@nestjs/swagger"
import { openApiDocument } from "api-contract"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(__dirname, "../../.env") })

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ["https://quizzy.valeriomattera.co.uk"],
    credentials: true,
  })

  SwaggerModule.setup("docs/api", app, openApiDocument)

  await app.listen(PORT)
}
bootstrap()
