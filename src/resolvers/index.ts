import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    me: async (parent: any, args: any, context: any) => {
      return await prisma.user.findUnique({
        where: { id: context.userId },
      });
    },
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: UserInfo, context: any) => {
      const hashPassword = await bcrypt.hash(args.password, 12);
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, "signature", {
        expiresIn: "1d",
      });
      return {
        token,
      };
    },
  },
};
