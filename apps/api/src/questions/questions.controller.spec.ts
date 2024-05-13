import { INestApplication } from "@nestjs/common"
import { createAppTestModule } from "../../test/appTestModule"
import supertest from "supertest"
import { prismaMock } from "../../test/prismaMock"

describe("QuestionsController", () => {
  let app: Awaited<INestApplication["getHttpAdapter"]>

  beforeEach(async () => {
    app = await createAppTestModule()
  })

  it("should get questions", async () => {
    prismaMock.question.findMany.mockResolvedValue([
      {
        id: 1,
        categoryId: 1,
        question: "Question 1",
        difficulty: "easy",
        correctAnswer: "Answer 1",
        incorrectAnswers: ["Answer 2", "Answer 3", "Answer 4"],
      },
    ])

    const res = await supertest(app).get("/api/questions?categoryId=1&difficulty=easy&amount=1")

    expect(res.status).toBe(200)
  })

  it("should throw a 400 error when providing wrong or no query", async () => {
    const res = await supertest(app).get("/api/questions?test=test")
    expect(res.status).toBe(400)
  })

  it("should create questions", async () => {
    prismaMock.category.findUnique.mockResolvedValue({ id: 1, name: "Category 1" })

    const res = await supertest(app)
      .post("/api/questions")
      .send({
        categoryId: 1,
        difficulty: "easy",
        questions: [
          {
            question: "Question 1",
            correctAnswer: "Answer 1",
            incorrectAnswers: ["Answer 2", "Answer 3", "Answer 4"],
          },
          {
            question: "Question 2",
            correctAnswer: "Answer 1",
            incorrectAnswers: ["Answer 2", "Answer 3", "Answer 4"],
          },
        ],
      })

    expect(res.status).toBe(201)
  })

  it("should throw a 400 error when providing a non-existing category", async () => {
    prismaMock.category.findUnique.mockResolvedValue(null)

    const res = await supertest(app)
      .post("/api/questions")
      .send({
        categoryId: 1,
        difficulty: "easy",
        questions: [
          {
            question: "Question 1",
            correctAnswer: "Answer 1",
            incorrectAnswers: ["Answer 2", "Answer 3", "Answer 4"],
          },
          {
            question: "Question 2",
            correctAnswer: "Answer 1",
            incorrectAnswers: ["Answer 2", "Answer 3", "Answer 4"],
          },
        ],
      })

    expect(res.status).toBe(400)
  })

  it("should throw a 400 error when providing wrong body", async () => {
    const res = await supertest(app).post("/api/questions").send({ test: "test" })

    expect(res.status).toBe(400)
  })

  it("should update a question", async () => {
    prismaMock.question.update.mockResolvedValue({
      id: 1,
      categoryId: 1,
      question: "Question 1",
      difficulty: "easy",
      correctAnswer: "Answer 1",
      incorrectAnswers: ["Answer 2", "Answer 3", "Answer 4"],
    })

    const res = await supertest(app).patch("/api/questions/1").send({ question: "Question 2" })

    expect(res.status).toBe(200)
  })

  it("should delete a question", async () => {
    const res = await supertest(app).delete("/api/questions/1")

    expect(res.status).toBe(204)
  })
})
