import { INestApplication } from "@nestjs/common"
import { createAppTestModule } from "../../test/appTestModule"

describe("UsersController", () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  let app: Awaited<INestApplication["getHttpAdapter"]>

  beforeEach(async () => {
    app = await createAppTestModule()
  })

  it.todo("should create a user")

  it.todo("should create an admin")

  it.todo("should get a user")

  it.todo("should update a user")

  it.todo("should delete a user")
})
