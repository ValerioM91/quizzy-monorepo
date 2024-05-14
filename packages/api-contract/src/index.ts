import { initContract } from '@ts-rest/core'
import {
  CategorySchema,
  GenerateWithAISchema,
  QuestionCreateManySchema,
  QuestionCreateSchema,
  QuestionGetQuerySchema,
  QuestionSchema,
} from './schemas'
import { z } from 'zod'

const c = initContract()

export const contract = c.router(
  {
    category: {
      getAll: {
        method: 'GET',
        path: '/categories',
        responses: {
          200: CategorySchema.array(),
        },
      },
      create: {
        method: 'POST',
        path: '/categories',
        body: CategorySchema.omit({ id: true }),
        responses: {
          201: CategorySchema,
        },
      },
      patch: {
        method: 'PATCH',
        path: '/categories/:id',
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        body: CategorySchema.omit({ id: true }),
        responses: {
          200: CategorySchema,
          404: z.object({
            message: z.string(),
          }),
        },
      },
      delete: {
        method: 'DELETE',
        path: '/categories/:id',
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({}),
        responses: {
          204: z.object({ success: z.boolean() }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    questions: {
      get: {
        method: 'GET',
        path: '/questions',
        query: QuestionGetQuerySchema,
        responses: {
          200: QuestionSchema.array(),
        },
      },
      createMany: {
        method: 'POST',
        path: '/questions',
        body: QuestionCreateManySchema,
        responses: {
          201: z.object({ success: z.boolean() }),
        },
      },
      patch: {
        method: 'PATCH',
        path: '/questions/:id',
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        body: QuestionSchema.omit({ id: true }).partial(),
        responses: {
          200: QuestionSchema,
          404: z.object({
            message: z.string(),
          }),
        },
      },
      delete: {
        method: 'DELETE',
        path: '/questions/:id',
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        body: z.object({}),
        responses: {
          204: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    openAI: {
      generateMany: {
        method: 'POST',
        path: '/openai',
        body: GenerateWithAISchema,
        responses: {
          200: QuestionCreateManySchema,
        },
      },
    },
  },
  {
    pathPrefix: '/api',
    strictStatusCode: true,
  }
)

export * from './schemas'
