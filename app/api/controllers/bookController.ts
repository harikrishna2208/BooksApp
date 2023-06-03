import { Request, Response } from 'express';
import * as booksService from '../services/bookService';
import constants from '../utils/constants';
import * as appResponse from '../utils/AppResponse';
import logger from '../middleware/logger';

export interface CreateBookRequest {
  title: string;
  author: string;
  description: string;
  publicationYear: number;
}

export const getBookByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  console.log("coming here")
  try {
    const parsedId = parseInt(id, 10);
    const book = await booksService.getBookById(parsedId);
    if (!book) {
      return appResponse.notFound(res, 'Book not found');
    }
    return appResponse.success(res, 'Book found', book);
  } catch (error) {
    console.error(error);
    return appResponse.internalServerError(res, 'An error occurred');
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  const { limit, offset, sortBy, sortOrder } = req.query;

  try {
    const books = await booksService.getAllBooksFromDb(parseInt(limit as string), parseInt(offset as string), sortBy as string, sortOrder as string);
    return appResponse.success(res, 'Books fetched successfully', { books });
  } catch (error) {
    console.log(error);
    return appResponse.internalServerError(res, 'Failed to fetch books');
  }
};


export const createBook = async (req: Request<{}, {}, CreateBookRequest>, res: Response) => {
  try {
    const bookDetails = req.body;
    const saveBookDetails = await booksService.saveNewBookDetailsToDatabase(bookDetails);
    if (!saveBookDetails) return appResponse.conflict(res, constants.DATA_NOT_SAVED);
    return appResponse.created(res, constants.INSERTED_SUCCESSFULLY);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

export const updateBookDetails = async (req: Request, res: Response) => {
  try {
    const bookDetails = req.body;
    const updateBookDetails = await booksService.updateBookDetailsInDatabase(bookDetails);
    if (!updateBookDetails) return appResponse.conflict(res, constants.UPDATE_FAIL);
    return appResponse.success(res, constants.DATA_UPDATED, updateBookDetails);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

export const deleteBookDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteBookDetail = await booksService.deleteBookDetailFromDb(parseInt(id));
    if (!deleteBookDetail) return appResponse.conflict(res, constants.DATA_NOT_SAVED);
    return appResponse.success(res, constants.DELETE_SUCCESSFUL);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const books = await booksService.searchBooks(query as string);
    return appResponse.success(res, 'Books fetched successfully', { books });
  } catch (error) {
    console.log(error, "error")
    return appResponse.internalServerError(res, 'Failed to fetch books');
  }
};


