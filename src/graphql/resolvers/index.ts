import { PrismaClient } from '../../../src/generated/prisma/index.js';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    cranes: async () => await prisma.crane.findMany(),
    roles: async () => await prisma.role.findMany(),
  },
  Mutation: {
    createCrane: async (_: any, args: any) => {
      const { serial_number, model, location, status } = args;
      return await prisma.crane.create({
        data: {
          serial_number,
          model,
          location,
          status,
        },
      });
    },
  },
};
