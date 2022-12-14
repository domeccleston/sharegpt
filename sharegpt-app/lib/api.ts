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
          comments: true,
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
    comments: convo._count.comments,
    createdAt: convo.createdAt.toISOString(),
  }));
}

export async function getConvo(id: string) {
  const convo = await prisma.conversation.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      content: true,
      views: true,
      comments: {
        select: {
          id: true,
          content: true,
          position: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              username: true,
              image: true,
            },
          },
        },
        where: {
          parentCommentId: null,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return {
    ...convo,
    comments:
      convo?.comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.toISOString(),
      })) ?? [],
  };
}

export async function getComments(id: string) {
  const comments = await prisma.comment.findMany({
    where: {
      conversationId: id,
      parentCommentId: null,
    },
    select: {
      id: true,
      content: true,
      position: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return comments.map((comment) => ({
    ...comment,
    createdAt: comment.createdAt.toISOString(),
  }));
}
