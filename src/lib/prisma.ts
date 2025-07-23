// src/lib/prisma.ts
const { PrismaClient } = require('../../src/generated/prisma/index.js');

const prisma = new PrismaClient();

export default prisma;
