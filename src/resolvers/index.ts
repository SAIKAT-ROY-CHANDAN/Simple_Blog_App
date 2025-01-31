import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    me: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: UserInfo, context: any) => {
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
