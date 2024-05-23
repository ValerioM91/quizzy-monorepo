import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma.service"
import { hashPassword } from "../../utils/hashPassword"
import { User } from "database"

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-unused-vars
  constructor(private prisma: PrismaService) {}

  async create(body: { email: string; password: string }) {
    const user = await this.prisma.user.create({ data: body })
    return user
  }

  // This method is not exposed to the outside world
  async createAdmin({ email, password }: { email: string; password: string }) {
    const result = await hashPassword(password)

    const user = await this.prisma.user.create({ data: { email, password: result, admin: true, approved: true } })
    return user
  }

  async findById(id: number | null) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return await this.prisma.user.update({ where: { id }, data: attrs })
  }

  async remove(id: number) {
    const user = await this.findById(id)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return await this.prisma.user.delete({ where: { id } })
  }
}
