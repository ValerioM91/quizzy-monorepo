import supertest from "supertest"
import { INestApplication } from "@nestjs/common"
import { prismaMock } from "../../test/prismaMock"
import { createAppTestModule } from "../../test/appTestModule"

describe("CategoriesController", () => {
  let app: Awaited<INestApplication["getHttpAdapter"]>

  beforeEach(async () => {
    app = await createAppTestModule()
  })

  // POST /api/categories
  it("should create a category", async () => {
    prismaMock.category.create.mockResolvedValue({ id: 1, name: "Category 1" })
    const { status, body } = await supertest(app).post("/api/categories").send({ name: "Category 2" })

    expect(status).toBe(201)

    if (status === 201) {
      expect(body.name).toBe("Category 1")
    }
  })

  it("should throw a 400 validation error when providing wrong body", async () => {
    const { status } = await supertest(app).post("/api/categories").send({ test: "test" })

    expect(status).toBe(400)
  })

  // GET /api/categories
  it("should get the categories", async () => {
    prismaMock.category.findMany.mockResolvedValue([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ])

    const { body } = await supertest(app).get("/api/categories")

    expect(body).toHaveLength(2)
    expect(body[0].name).toBe("Category 1")
    expect(body[1].name).toBe("Category 2")
  })

  // PATCH /api/categories/:id
  it("should update a category", async () => {
    prismaMock.category.findUnique.mockResolvedValue({ id: 1, name: "Category 1" })
    prismaMock.category.update.mockResolvedValue({ id: 1, name: "Category 2" })

    const { body, status } = await supertest(app).patch("/api/categories/1").send({ name: "Category 2" })

    expect(status).toBe(200)
    if (status !== 200) return
    expect(body.name).toBe("Category 2")
  })

  it("should throw a 404 error when updating a non-existing category", async () => {
    prismaMock.category.findUnique.mockResolvedValue(null)
    const { status } = await supertest(app).patch("/api/categories/1").send({ name: "Category 2" })
    expect(status).toBe(404)
  })

  // DELETE /api/categories/:id
  it("should delete a category", async () => {
    prismaMock.category.findUnique.mockResolvedValue({ id: 1, name: "Category 1" })
    const { status } = await supertest(app).delete("/api/categories/1")
    expect(status).toBe(204)
  })
})
