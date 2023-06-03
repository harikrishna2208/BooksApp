import jwt from 'jsonwebtoken';
import config from '../../config/config';
import * as appResponse from '../utils/AppResponse';
import constants from '../utils/constants';
import logger from './logger';

const { accessTokenKey, refreshTokenKey } = config

export const verifyAccessToken = (req: any, res: any, next: any) => {
  if (
    !req.headers?.authorization ||
    (req.headers.authorization === 'Bearer' && req.headers.authorization.length === 6)
  ) {
    return appResponse.internalServerError(res, constants.NO_TOKEN, { tokenPresent: false });
  }

  const [, token] = req.headers.authorization.split(' ');

  jwt.verify(token, accessTokenKey, (err: any, decodedResult: any) => {
    if (err) {
      return appResponse.invalidCredentials(res, constants.TOKEN_FAIL);
    }
    res.locals.email = decodedResult.email;
    next();
  });
};

export const generateAccessToken = (email: string) => {
  const user = { email };
  const accessToken = jwt.sign(user, accessTokenKey, { expiresIn: '80m' });
  return accessToken;
};

export const generateRefreshToken = (email: string) => {
  const user = { email };
  const refreshToken = jwt.sign(user, refreshTokenKey, {
    expiresIn: '1d',
  });
  return refreshToken;
};

export const generateTokens = (req: any, res: any) => {
  const { refreshTokenBooks } = req.cookies;

  if (!refreshTokenBooks) {
    return appResponse.internalServerError(res, constants.NO_COOKIE, { tokenPresent: false });
  }

  let refreshToken;
  try {
    refreshToken = jwt.verify(refreshTokenBooks, refreshTokenKey);
  } catch {
    return appResponse.internalServerError(res, constants.TOKEN_GEN_FAIL, { tokenVerify: false });
  }

  const accessToken = generateAccessToken(req.body.email);
  return appResponse.success(res, constants.TOKEN_GENERATED, { accessToken });
};


export const logLogoutUser = (token: string) => {
  jwt.verify(token, refreshTokenKey, (err: any, decoded: any) => {
    if (err) logger.error(err);
    logger.info(`${decoded.email} is logged out`);
  });
};

export const logoutUser = (req: any, res: any) => {
  const setCookieData = req.cookies?.refreshTokenBooks;
  if (!setCookieData) {
    return appResponse.internalServerError(res, constants.NO_COOKIE, { tokenPresent: false });
  }
  logLogoutUser(req.cookies.refreshTokenBooks);
  res.cookie('refreshTokenBooks', '', { maxAge: -1, overwrite: true });
  return appResponse.success(res, constants.DELETE_SUCCESSFUL);
};
