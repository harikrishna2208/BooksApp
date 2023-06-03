import { Response } from 'express';

const SUCCESS = 200;
const CREATED = 201;
const CONFLICT = 409;
const NOTFOUND = 404;
const INVALID_CREDENTIALS = 403;
const INTERNAL_SERVER_ERROR = 500;
const RESET_CONTENT = 205;
const BAD_REQUEST = 400;
const METHOD_NOT_ALLOWED = 405;
const EXPECTATION_FAILED = 417;
const NO_CONTENT_AVAILABLE = 204;
const NOT_MODIFIED = 304;
const NOT_AUTHORIZED = 401;
const UNPROCESSABLE_ENTITY = 422;

export const success = (res: Response, message: string, data?: object): void => {
  res.status(SUCCESS).send({ status: 'SUCCESS', message, data });
};

export const badRequest = (res: Response, message: string, data: object): void => {
  res.status(BAD_REQUEST).send({ status: 'FAILURE', message, data });
};

export const created = (res: Response, message: string, data?: object): void => {
  res.status(CREATED).send({ status: 'SUCCESS', message, data });
};

export const conflict = (res: Response, message: string, data?: object): void => {
  res.status(CONFLICT).send({ status: 'FAILURE', message, data });
};

export const notFound = (res: Response, message: string, data?: object): void => {
  res.status(NOTFOUND).send({ status: 'FAILURE', message, data });
};

export const notInserted = (res: Response, message: string, data: object): void => {
  res.status(CONFLICT).send({ status: 'FAILURE', message, data });
};

export const invalidCredentials = (res: Response, message: string, data?: object): void => {
  res.status(INVALID_CREDENTIALS).send({ status: 'FAILURE', message, data });
};

export const invalidInput = (res: Response, message: string, data: object): void => {
  res.status(RESET_CONTENT).send({ status: 'FAILURE', message, data });
};

export const internalServerError = (res: Response, message: string, data?: object): void => {
  res.status(INTERNAL_SERVER_ERROR).send({ status: 'FAILURE', message, data });
};

export const methodNotAllowed = (res: Response, message: string, data: object): void => {
  res.status(METHOD_NOT_ALLOWED).send({ status: 'FAILURE', message, data });
};

export const expectationFailed = (res: Response, message: string, data: object): void => {
  res.status(EXPECTATION_FAILED).send({ status: 'FAILURE', message, data });
};

export const notContentForThisRequest = (res: Response, message: string, data: object): void => {
  res.status(NO_CONTENT_AVAILABLE).send({ status: 'NO CONTENT', message, data });
};

export const notUpdated = (res: Response, message: string, data: object): void => {
  res.status(NOT_MODIFIED).send({ status: 'FAILURE', message, data });
};

export const notAuthorized = (res: Response, message: string, data: object): void => {
  res.status(NOT_AUTHORIZED).send({ status: 'UNAUTHORIZED', message, data });
};

export const unProcessableEntity = (res: Response, message: string, data: object): void => {
  res.status(UNPROCESSABLE_ENTITY).send({ status: 'FAILURE', message, data });
};


