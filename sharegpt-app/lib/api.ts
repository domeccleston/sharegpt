import prisma from "@/lib/prisma";

export async function getConvos({
  orderBy,
  take,
  skip = 0,
}: {
  orderBy: string;
  take: number;
  skip?: number;
}) {
  const convos = await prisma.conversation.findMany({
    select: {
      id: true,
      title: true,
      avatar: true,
      // until we're ready to add user profiles
      // creator: {
      //   select: {
      //     name: true,
      //     username: true,
      //     image: true,
      //   },
      // },
      _count: {
        select: {
          upvotes: true,
        },
      },
      views: true,
      createdAt: true,
    },
    orderBy: {
      [orderBy]: "desc",
    },
    take,
    skip,
  });

  return convos.map((convo) => ({
    ...convo,
    upvotes: convo._count.upvotes,
    createdAt: convo.createdAt.toISOString(),
  }));
}
