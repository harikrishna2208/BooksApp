import bcrypt from 'bcryptjs';
import config from '../../config/config';
import * as userRepository from '../repositories/userRepository';
import { User } from '@prisma/client';


const { salt } = config


interface createIUser {
  id?: string,
  userName: string,
  emailId: string,
  password: string,
}

export async function createUser(user: createIUser) {
  const userData: createIUser = { ...user }; // Specify the type of userData explicitly
  userData.password = await bcrypt.hash(userData.password, parseInt(salt, 10));
  const createdUser = await userRepository.createUserInDB(userData);
  return createdUser;
}


export async function verifyUserInfo(email: string) {
  const userData = await userRepository.verifyUserExistence(email);
  return userData;
}

export async function checkPassword(UserPass: string, DBPass: string) {
  const passwordCheck = await bcrypt.compare(UserPass, DBPass);
  return passwordCheck;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}


export async function changePassword(userId: number, currentPassword: string, newPassword: string): Promise<User> {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid current password');
  }

  const hashedPassword = await hashPassword(newPassword);
  return await userRepository.updatePassword(userId, hashedPassword);

}
