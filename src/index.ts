import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export type Cart = {
  product: string | null;
};

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.user.create({
  //   data: {
  //     id: 'master',
  //     email: '111@gmail.com',
  //     password: '111',
  //     name: 'youngho',
  //     phone: '010-1234-5678',
  //     cart: {
  //       create: { product: 'hello' }, // default는 null로 반듣시 설정하자
  //     },
  //   },
  // });
  // const allUsers: (User & { cart: Cart[] })[] = await prisma.user.findMany({
  //   include: {
  //     cart: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });
  const cart = await prisma.cart.update({
    where: { idx: 1 },
    data: {
      product: 'bye',
    },
  });
  console.log(cart);
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
