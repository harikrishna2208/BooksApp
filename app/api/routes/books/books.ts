import express, { Router } from 'express';
import * as bookController from '../../controllers/bookController';
import * as jwtService from '../../middleware/JWT';
import { bookDetailsValidation, getBookDetailsSchema } from '../../middleware/validation';

const booksRouter: Router = express.Router();

booksRouter.get('/', jwtService.verifyAccessToken, getBookDetailsSchema, bookController.getAllBooks);

// Retrieve a list of searching
booksRouter.get('/search',jwtService.verifyAccessToken, bookController.searchBooks);

booksRouter.get('/:id', jwtService.verifyAccessToken, bookController.getBookByIdController)

// Create a new book
booksRouter.post('/', jwtService.verifyAccessToken, bookDetailsValidation, bookController.createBook);

// Update an existing book by its ID
booksRouter.put('/:id', jwtService.verifyAccessToken, bookDetailsValidation, bookController.updateBookDetails);

// Delete a book by its ID
booksRouter.delete('/:id', jwtService.verifyAccessToken, bookController.deleteBookDetails);


export default booksRouter;