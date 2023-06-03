import { Book } from '@prisma/client';
import * as booksRepository from '../repositories/bookRepository';
import { CreateBookRequest } from '../controllers/bookController';

export async function getAllBooksFromDb(limit: number, offset: number, sortBy: string, sortOrder: string) {
  try {
    const books = await booksRepository.getAllBooksDetailFromDb(limit, offset, sortBy, sortOrder);
    return books;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch books');
  }
}


export async function saveNewBookDetailsToDatabase(bookDetails: CreateBookRequest) {
  const saveBookDetails = await booksRepository.saveNewBookToDatabase(bookDetails);
  return saveBookDetails;
}

export async function updateBookDetailsInDatabase(bookDetails: any) {
  const updatedBook = await booksRepository.updateBookInDatabase(bookDetails);
  return updatedBook;
}

export const getBookById = async (bookId: number): Promise<Book | null> => {
  const book = await booksRepository.findBookById(bookId);
  return book;
};

export async function deleteBookDetailFromDb(bookId: number) {
  const deletedBook = await booksRepository.deleteBookDetailsFromDb(bookId);
  return deletedBook;
}

export async function getAllBooksNameFromDb() {
  const allBookNames = await booksRepository.getAllBookNamesFromDatabase();
  return allBookNames;
}

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const books = await booksRepository.searchBooks(query);
    return books;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
};
