import { Injectable } from "@nestjs/common"
import { Question } from "database"

import OpenAI from "openai"
import { LocalIndex } from "vectra"

const index = new LocalIndex("./", "index")

@Injectable()
export class VectorService {
  openAI: OpenAI
  // eslint-disable-next-line no-unused-vars
  constructor() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_AI_KEY,
    })
  }

  async getVector(text: string) {
    if (!(await index.isIndexCreated())) {
      await index.createIndex()
    }
    const response = await this.openAI.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })
    return response.data[0].embedding
  }

  async addItem({ question, id, categoryId }: Question) {
    if (!(await index.isIndexCreated())) {
      await index.createIndex()
    }
    await index.insertItem({
      vector: await this.getVector(question),
      id: id.toString(),
      metadata: { question, id, categoryId },
    })
  }

  async updateItem(question: Question) {
    await this.deleteItem(question.id)
    await this.addItem(question)
  }

  async deleteItem(questionId: number) {
    await index.deleteItem(questionId.toString())
  }

  async querySimilar(text: string, categoryId: number) {
    const vector = await this.getVector(text)

    const results = await index.queryItems(vector, 3, { categoryId })

    return results.map(({ item: { metadata }, score }) => ({
      question: metadata.question.toString(),
      id: +metadata.id,
      categoryId: +metadata.categoryId,
      score,
    }))
  }
}
