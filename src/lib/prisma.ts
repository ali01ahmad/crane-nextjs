// src/lib/prisma.ts
const { PrismaClient } = await import('../../src/generated/prisma/index.js');

const prisma = new PrismaClient();

export default prisma;
