import { Request, Response, NextFunction } from 'express';
import { signUpSchema, loginSchema, bookSchemaFunction, changePassword as chnagePasswordSchema, paramsForGetBooks } from '../utils/validationSchema';
import * as appResponse from '../utils/AppResponse';
import constants from '../utils/constants';
import logger from './logger';
// import { getAllBooksNameFromDb } from '../services/bookService';

const signUpValidation = (req: Request, res: Response, next: NextFunction): void => {
  // validate the req.body to pass certain criteria.
  const result = signUpSchema.validate(req.body);
  const { error } = result; // check whether error exist from validation
  const valid = error == null;
  if (!valid) {
    logger.info(error);
    return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, { error: error.message });
  }
  next();
};

const loginValidation = (req: Request, res: Response, next: NextFunction): void => {
  const result = loginSchema.validate(req.body);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    logger.info(error);
    return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, { error: error.message });
  }
  next();
};

const changePassword = (req: Request, res: Response, next: NextFunction): void => {
  const result = chnagePasswordSchema.validate(req.body);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    logger.info(error);
    return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, { error: error.message });
  }
  next();
};


const getBookDetailsSchema = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = paramsForGetBooks.validate(req.query);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    logger.info(error);
    return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, { error: error.message });
  }
  const { value } = result
  req.body = value
  next();
};

const bookDetailsValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = bookSchemaFunction(req.body, req.method);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    logger.info(error);
    return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, { error: error.message });
  }
  const { value } = result
  req.body = value
  next();
};

export {
  signUpValidation,
  loginValidation,
  bookDetailsValidation,
  changePassword,
  getBookDetailsSchema
};
