import { PrismaClient, Refresh, User } from '@prisma/client';
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export type Cart = {
  product: string | null;
};

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      idx: uuidv4(),
      id: 'master',
      email: '111@gmail.com',
      password: '111',
      name: 'mine',
      phone: '010-1234-5678',
      cart: {
        create: { idx: '550e8400-e29b-41d4-a716-446655440003' }, // default는 null로 반듣시 설정하자
      },
      refresh: {
        create: {
          idx: '550e8400-e29b-41d4-a716-446655440001',
          token: '550e8400-e29b-41d4-a716-446655440000',
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
