import supertest from "supertest"
import { createAppTestModule } from "../../test/appTestModule"
import { INestApplication } from "@nestjs/common"
import { openAIMock } from "../../test/openAiMock"

describe("OpenaiController", () => {
  let app: Awaited<INestApplication["getHttpAdapter"]>

  beforeEach(async () => {
    app = await createAppTestModule()
  })

  it.todo("FIX THIS TEST")
  it("should generate some questions", async () => {
    openAIMock.chat.completions.create.mockResolvedValue({
      choices: [
        {
          message: {
            tool_calls: [
              {
                // @ts-ignore
                function: {
                  arguments: `{"questions":[{"question":"In the game 'Overwatch', what role does the character Mercy play?","correctAnswer":"Support","incorrectAnswers":["Tank","Damage","Builder"]},{"question":"In the game 'League of Legends', which city-state does the champion Garen belong to?","correctAnswer":"Demacia","incorrectAnswers":["Noxus","Freljord","Piltover"]},{"question":"In 'Super Mario Bros.', what animal does Mario become when he gets the Tanooki Suit?","correctAnswer":"Raccoon","incorrectAnswers":["Fox","Bear","Rabbit"]},{"question":"In the game 'Among Us', what is the color of the character that is featured in the game icon?","correctAnswer":"Red","incorrectAnswers":["Blue","Green","Yellow"]},{"question":"In 'Minecraft', what material do you need to create a bed?","correctAnswer":"Wool and Wood","incorrectAnswers":["Feathers and Wood","Leather and Stone","Wool and Stone"]}]}`,
                },
              },
            ],
          },
        },
      ],
    })
    const res = await supertest(app).post("/api/openai").send({
      categoryId: 1,
      difficulty: "easy",
      numberOfQuestions: 2,
    })

    expect(res.status).toBe(200)
  })

  it("should throw a 400 error when providing wrong body", async () => {
    const res = await supertest(app).post("/api/openai").send({ test: "test" })

    expect(res.status).toBe(400)
  })
})
