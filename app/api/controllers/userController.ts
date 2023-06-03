import { Request, Response } from 'express';
import * as userService from '../services/userService';
import * as jwtService from '../middleware/JWT';
import constants from '../utils/constants';
import * as appResponse from '../utils/AppResponse';
import logger from '../middleware/logger';

interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const createUser = async (req: Request<{}, {}, CreateUserRequestBody>, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // check whether User is already registered in user database
    const userEmailExist = await userService.verifyUserInfo(email);

    if (userEmailExist) {
      return appResponse.conflict(res, constants.DUPLICATE_RECORD);
    }

    const userCreated = await userService.createUser({
      userName: name.replace(/\s+/g, ' ').trim(),
      emailId: email.toLowerCase(),
      password,
    });

    if (!userCreated) return appResponse.conflict(res, constants.USER_NOT_CREATED);

    return appResponse.created(res, constants.USER_CREATED);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

interface LoginRequestBody {
  email: string;
  password: string;
}

export const loginUser = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  try {
    const emailId = req.body.email.toLowerCase();
    const userRecord = await userService.verifyUserInfo(emailId);
    if (!userRecord) {
      return appResponse.notFound(res, constants.NO_RECORD_FOUND);
    }
    if (await userService.checkPassword(req.body.password, userRecord.password)) {
      const accessToken = jwtService.generateAccessToken(userRecord.emailId);
      const refreshToken = jwtService.generateRefreshToken(userRecord.emailId);
      res.cookie('refreshTokenBooks', refreshToken, {
        maxAge: 86400000,
        httpOnly: true,
      });
      return appResponse.success(res, constants.LOGGED_IN, {
        accessToken,
        userEmail: userRecord.emailId,
      });
    }
    return appResponse.invalidCredentials(res, constants.PASS_INCORRECT);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};


export const changePasswordController = async (req: Request, res: Response) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    await userService.changePassword(userId, currentPassword, newPassword);
    return appResponse.success(res, 'Password changed successfully');
  } catch (error) {
    // Error occurred during password change
    const errorMessage = (error as Error).message;
    return appResponse.internalServerError(res, errorMessage);
  }
};









