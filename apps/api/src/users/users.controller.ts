import { Controller } from "@nestjs/common"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly usersService: UsersService) {}
}
