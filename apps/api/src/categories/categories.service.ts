import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async get(id: number) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async getAll() {
    return await this.prisma.category.findMany();
  }

  async create(data: { name: string }) {
    return await this.prisma.category.create({ data });
  }

  async delete(id: number) {
    return await this.prisma.category.delete({ where: { id } });
  }

  async patch(id: number, data: { name: string }) {
    return await this.prisma.category.update({
      where: { id },
      data,
    });
  }
}
