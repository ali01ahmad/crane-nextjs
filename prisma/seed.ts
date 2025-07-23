export {};

const { PrismaClient } = await import('../src/generated/prisma/index.js');

const prisma = new PrismaClient();

async function main() {
  
  await prisma.user.create({
    data: {
      name: 'Admin New',
      email: 'new@example.com',
      password: '$2a$10$EIX/5Z1z3b7f8Q9e1j5uOe0k1Z4F6y5m1z3b7f8Q9e1j5uOe0k1Z4F6', // hashed password for 'password123'
      role: {
        create: {
          name: 'admin',
          permission: 'all',
        },
      },
    },
  });
}

main()
  .then(() => {
    console.log('Seeded successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
