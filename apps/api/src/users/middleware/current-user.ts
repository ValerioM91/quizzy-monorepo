import { Injectable, type NestMiddleware } from "@nestjs/common"
import { UsersService } from "../../users/users.service"
import type { NextFunction, Request, Response } from "express"
import type { User } from "database"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: Omit<User, "password">
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  // eslint-disable-next-line no-unused-vars
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const session = "session" in req ? (req.session as { userId: number | null }) : null
    const userId = session?.userId

    if (userId) {
      const user = await this.usersService.findById(userId)
      req.currentUser = user
    }

    next()
  }
}
