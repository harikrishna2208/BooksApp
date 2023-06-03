import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

type UserCreationInput = Omit<User, 'id'>;


export const createUserInDB = async (user: UserCreationInput) => {
  const userCreate = await prisma.user.create({ data: user });
  return userCreate;
};

export interface UserExistence {
  emailId: string;
  userName: string;
  password: string;
}

export const verifyUserExistence = async (email: string): Promise<UserExistence | null> => {
  const userExistence = await prisma.user.findFirst({
    where: { emailId: email },
    select: { emailId: true, userName: true, password: true },
  });
  return userExistence;
};


export async function findUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}


export async function updatePassword(userId: number, password: string): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: { password },
  });
}