import { PrismaClient } from '@prisma/client'
import { ContextParameters } from 'graphql-yoga/dist/types'

const prisma = new PrismaClient()

export type Context = {
  prisma: PrismaClient,
  user: {
    id: string;
    roles: string[];
  }
}

export const createContext = (yogaCtx: ContextParameters): Context => {
  return {
    prisma,
    user: yogaCtx.request.user ?? {
      id: "",
      roles: [],
    }
  }
}
