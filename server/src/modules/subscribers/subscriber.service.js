import prisma from "../../config/db.js";

export const subscribe = async (email) => {
  const existing = await prisma.subscriber.findUnique({
    where: {
      email,
    },
  });

  if (existing) {
    throw new Error("Email is already subscribed.");
  }

  return await prisma.subscriber.create({
    data: {
      email,
    },
  });
};

export const getSubscribers = async () => {
  return await prisma.subscriber.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteSubscriber = async (id) => {
  return await prisma.subscriber.delete({
    where: {
      id,
    },
  });
};