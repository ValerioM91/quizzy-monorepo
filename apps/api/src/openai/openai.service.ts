import OpenAI from "openai"
import { BadRequestException, Injectable } from "@nestjs/common"
import { type Difficulty } from "database"
import { QuestionCreateSchema } from "api-contract"
import { z } from "zod"
import { type PrismaService } from "../prisma.service"

@Injectable()
export class OpenaiService {
  openAI: OpenAI
  // eslint-disable-next-line no-unused-vars
  constructor(private prisma: PrismaService) {
    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_AI_KEY,
    })
  }

  async generateWithAI({
    difficulty,
    categoryId,
    numberOfQuestions,
  }: {
    difficulty: Difficulty
    categoryId: number
    numberOfQuestions: number
  }) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    })
    if (!category) {
      throw new BadRequestException("Category not found")
    }

    const currentQuestions = await this.prisma.question.findMany({
      where: { difficulty, categoryId },
    })

    const response = await this.openAI.chat.completions.create({
      model: "gpt-4",
      temperature: 1,
      tool_choice: {
        type: "function",
        function: {
          name: "submit_findings",
        },
      },
      tools: [
        {
          type: "function",
          function: {
            name: "submit_findings",
            parameters: {
              type: "object",
              properties: {
                questions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      question: {
                        type: "string",
                        description: "A question to ask the user during the game",
                      },
                      correctAnswer: {
                        type: "string",
                        description: "The correct answer to the question",
                      },
                      incorrectAnswers: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        description: "Incorrect answers to display to the user",
                      },
                    },
                    required: ["name", "correctAnswer", "incorrectAnswers"],
                  },
                },
              },
            },
          },
        },
      ],
      messages: [
        {
          role: "assistant",
          content: `You are an assistant that helps me generate questions for my quiz game. I'll provide you with a category and a difficulty and you will generate ${numberOfQuestions} sets of questions and answers. Each question must have 1 correct answer and 3 incorrect ones. Use the 'submit_findings' tool. I'll provide you with the current questions in the database, avoid repeating them.`,
        },
        {
          role: "user",
          content: `Category: ${category.name}, Difficulty: ${difficulty}`,
        },
        {
          role: "user",
          content: "Current questions in the database: " + currentQuestions.map(q => q.question).join(", "),
        },
      ],
    })

    const rawJson = response.choices[0]?.message.tool_calls?.[0]?.function.arguments

    if (!rawJson) {
      throw new BadRequestException("No response from OpenAI")
    }

    const { questions } = z.object({ questions: QuestionCreateSchema.array() }).parse(JSON.parse(rawJson))

    return questions
  }
}
