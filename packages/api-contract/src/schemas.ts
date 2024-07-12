import { z } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { Difficulty } from 'database'

extendZodWithOpenApi(z)

export const requiredString = z.string().min(1, 'This field is required')

export const difficultySchema = z.nativeEnum(Difficulty)

export const QuestionSchema = z.object({
  id: z.number(),
  question: requiredString.describe('A question to ask the user during the game'),
  correctAnswer: requiredString.describe('The correct answer to the question'),
  incorrectAnswers: z
    .array(requiredString)
    .length(3)
    .describe('Incorrect answers to display to the user'),
  categoryId: z.number(),
  difficulty: difficultySchema,
})
export type Question = z.infer<typeof QuestionSchema>

export const QuestionCreateSchema = QuestionSchema.omit({ id: true })
export type QuestionCreate = z.infer<typeof QuestionCreateSchema>

export const QuestionCreateManySchema = z.object({
  difficulty: difficultySchema,
  categoryId: z.number(),
  questions: QuestionSchema.pick({
    question: true,
    correctAnswer: true,
    incorrectAnswers: true,
  }).array(),
})
export type QuestionCreateMany = z.infer<typeof QuestionCreateManySchema>

export const CategorySchema = z.object({
  id: z.number(),
  name: requiredString,
})

export const QuestionGetQuerySchema = z.object({
  categoryId: z.coerce.number(),
  difficulty: difficultySchema,
  amount: z.coerce.number().min(1),
})

export const QuestionGetPaginatedQuerySchema = z.object({
  categoryId: z.coerce.number(),
  difficulty: difficultySchema,
  page: z.coerce.number().min(1),
  take: z.coerce.number().optional(),
})

export const QuestionOpenSchema = z.object({
  name: requiredString,
})

export const GenerateWithAISchema = z.object({
  categoryId: z.number(),
  difficulty: z.nativeEnum(Difficulty),
  numberOfQuestions: z.number(),
})
