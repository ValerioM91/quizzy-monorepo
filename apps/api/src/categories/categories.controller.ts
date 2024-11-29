import { Controller, NotFoundException, UseGuards } from "@nestjs/common"
import { CategoriesService } from "./categories.service"
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest"
import { contract } from "api-contract"
import { AuthGuard } from "../guards/auth.guard"

@Controller()
export class CategoriesController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly categoriesService: CategoriesService) {}

  @TsRestHandler(contract.category.getAll)
  async getAll() {
    return tsRestHandler(contract.category.getAll, async () => {
      return {
        status: 200,
        body: await this.categoriesService.getAll(),
      }
    })
  }

  @TsRestHandler(contract.category.create)
  @UseGuards(AuthGuard)
  async create() {
    return tsRestHandler(contract.category.create, async ({ body }) => {
      const category = await this.categoriesService.create(body)

      return {
        status: 201,
        body: category,
      }
    })
  }

  @TsRestHandler(contract.category.patch)
  @UseGuards(AuthGuard)
  async patch() {
    return tsRestHandler(contract.category.patch, async ({ params: { id }, body }) => {
      const category = await this.categoriesService.get(id)

      if (!category) {
        throw new NotFoundException("Category not found")
      }

      return {
        status: 200,
        body: await this.categoriesService.patch(id, body),
      }
    })
  }

  @TsRestHandler(contract.category.delete)
  @UseGuards(AuthGuard)
  async delete() {
    return tsRestHandler(contract.category.delete, async ({ params: { id } }) => {
      const category = await this.categoriesService.get(id)

      if (!category) {
        throw new NotFoundException("Category not found")
      }

      await this.categoriesService.delete(id)

      return {
        status: 204,
        body: { success: true },
      }
    })
  }
}
