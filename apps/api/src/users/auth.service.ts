import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common"
import { UsersService } from "./users.service"
import { comparePasswords, hashPassword } from "../../utils/hashPassword"
import { AdminGuard } from "../guards/admin.guard"

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-unused-vars
  constructor(private usersService: UsersService) {}

  // For now, I'm allowing only admins to create new users to access to dashboard
  @UseGuards(AdminGuard)
  async signup({ email, password }: { email: string; password: string }) {
    const existingUser = await this.usersService.findByEmail(email)
    if (existingUser) {
      throw new BadRequestException("Email already in use")
    }
    const result = await hashPassword(password)

    const user = await this.usersService.create({ email, password: result })

    return user
  }

  async signin({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      throw new NotFoundException("User not found")
    }

    if (!user.approved) {
      throw new UnauthorizedException("User not approved")
    }

    const correctPassword = await comparePasswords(user.password, password)

    if (!correctPassword) {
      throw new BadRequestException("Invalid password")
    }

    return { id: user.id, email: user.email }
  }
}
