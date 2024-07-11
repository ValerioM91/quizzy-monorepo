import { BadRequestException, Injectable } from "@nestjs/common"
import OpenAI from "openai"
import { z } from "zod"
import zodToJsonSchema from "zod-to-json-schema"

import { QuestionCreateSchema } from "api-contract"
import { type Difficulty } from "database"

import { PrismaService } from "../prisma.service"

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

    const schema = z.object({ questions: QuestionCreateSchema.array() })

    const jsonSchema = zodToJsonSchema(schema)

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
            parameters: jsonSchema,
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

    const { questions } = schema.parse(JSON.parse(rawJson))

    return questions
  }
}
