import { Controller, NotFoundException } from "@nestjs/common"
import { CategoriesService } from "./categories.service"
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest"
import { contract } from "api-contract"

@Controller()
export class CategoriesController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly categoriesService: CategoriesService) {}

  @TsRestHandler(contract.category)
  async handler() {
    return tsRestHandler(contract.category, {
      create: async ({ body }) => {
        return {
          status: 201,
          body: await this.categoriesService.create(body),
        }
      },
      getAll: async () => {
        return {
          status: 200,
          body: await this.categoriesService.getAll(),
        }
      },
      patch: async ({ params: { id }, body }) => {
        const category = await this.categoriesService.get(id)

        if (!category) {
          throw new NotFoundException("Category not found")
        }

        return {
          status: 200,
          body: await this.categoriesService.patch(id, body),
        }
      },
      delete: async ({ params: { id } }) => {
        const category = await this.categoriesService.get(id)

        if (!category) {
          throw new NotFoundException("Category not found")
        }

        await this.categoriesService.delete(id)

        return {
          status: 204,
          body: { success: true },
        }
      },
    })
  }
}
