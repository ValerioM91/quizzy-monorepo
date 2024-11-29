import { Controller, Req, Session, UseGuards } from "@nestjs/common"
import { contract } from "api-contract"
import { tsRestHandler, TsRestHandler } from "@ts-rest/nest"
import { AuthService } from "./auth.service"
import type { UserSession } from "./users.types"
import { AuthGuard } from "../guards/auth.guard"

@Controller()
export class UsersController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly authService: AuthService,
  ) {}

  @TsRestHandler(contract.authentication.login)
  async login(@Session() session: UserSession) {
    return tsRestHandler(contract.authentication.login, async ({ body }) => {
      const user = await this.authService.signin(body)
      session.userId = user.id

      return {
        status: 200,
        body: { user },
      }
    })
  }

  @TsRestHandler(contract.authentication.logout)
  async logout(@Req() req: Request, @Session() session: UserSession) {
    return tsRestHandler(contract.authentication.logout, async () => {
      session.userId = null
      return {
        status: 200,
        body: { success: true },
      }
    })
  }

  @TsRestHandler(contract.authentication.currentUser)
  @UseGuards(AuthGuard)
  async currentUser(@Req() req: Request) {
    return tsRestHandler(contract.authentication.currentUser, async () => {
      if ("currentUser" in req) {
        return {
          status: 200,
          body: { ...(req.currentUser as { id: number; email: string }) },
        }
      }
      return {
        status: 404,
        body: { message: "No user" },
      }
    })
  }
}
