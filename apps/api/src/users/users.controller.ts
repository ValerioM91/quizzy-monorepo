import { Controller, Req, Session } from "@nestjs/common"
import { contract } from "api-contract"
import { tsRestHandler, TsRestHandler } from "@ts-rest/nest"
import { AuthService } from "./auth.service"

@Controller()
export class UsersController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly authService: AuthService,
  ) {}

  @TsRestHandler(contract.authentication)
  async handler() {
    return tsRestHandler(contract.authentication, {
      login: async ({ body }) => {
        const user = await this.authService.signin(body)
        // session.user = user

        return {
          status: 200,
          body: { user },
        }
      },
      logout: async () => {
        // session.user = null
        return {
          status: 200,
          body: { success: true },
        }
      },
    })
  }
}
