import { z } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { Difficulty } from 'database'

extendZodWithOpenApi(z)

export const requiredString = z.string().min(1, 'This field is required')

export const difficulty = z.nativeEnum(Difficulty)

export const QuestionSchema = z.object({
  id: z.number(),
  question: requiredString,
  correctAnswer: requiredString,
  incorrectAnswers: z.array(requiredString).length(3),
  categoryId: z.number(),
  difficulty,
})
export type Question = z.infer<typeof QuestionSchema>

export const QuestionCreateSchema = QuestionSchema.pick({
  question: true,
  correctAnswer: true,
  incorrectAnswers: true,
})
export type QuestionCreate = z.infer<typeof QuestionCreateSchema>

export const QuestionCreateManySchema = z.object({
  difficulty,
  categoryId: z.number(),
  questions: QuestionCreateSchema.array(),
})
export type QuestionCreateMany = z.infer<typeof QuestionCreateManySchema>

export const CategorySchema = z.object({
  id: z.number(),
  name: requiredString,
})

export const QuestionGetQuerySchema = z.object({
  categoryId: z.coerce.number(),
  difficulty,
})

export const QuestionOpenSchema = z.object({
  name: requiredString,
})

export const GenerateWithAISchema = z.object({
  categoryId: z.number(),
  difficulty: z.nativeEnum(Difficulty),
  numberOfQuestions: z.number(),
})
