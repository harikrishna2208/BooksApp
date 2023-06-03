import { PrismaClient, Book } from '@prisma/client';
import { CreateBookRequest } from '../controllers/bookController';

const prisma = new PrismaClient();

interface BookInterface extends CreateBookRequest {
  id: number;
}

export const getAllBooksDetailFromDb = async (limit: number, offset: number, sortBy: string, sortOrder: string) => {
  const books = await prisma.book.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      [sortBy ?? "title"]: sortOrder === 'desc' ? 'desc' : 'asc',
    },
  });
  return books;
};


export const saveNewBookToDatabase = async (bookDetails: CreateBookRequest) => {
  const saveToDb = await prisma.book.create({
    data: bookDetails,
  });
  return saveToDb;
};

export const findBookById = async (bookId: number): Promise<Book | null> => {
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });
  return book;
};

export const updateBookInDatabase = async (bookDetails: BookInterface[]) => {
  const updateToDB = await Promise.all(
    bookDetails.map(async (book) => {
      const updatedBook = await prisma.book.update({
        where: { id: book.id },
        data: {
          title: book.title,
          author: book.author,
          description: book.description,
          publicationYear: book.publicationYear,
        },
      });
      return updatedBook;
    })
  );
  return updateToDB;
};

export const deleteBookDetailsFromDb = async (bookId: number) => {
  const deleteInDb = await prisma.book.delete({
    where: {
      id: bookId,
    },
  });
  return deleteInDb;
};

export const getAllBookNamesFromDatabase = async () => {
  const bookNames = await prisma.book.findMany({
    distinct: ['title'],
    select: { title: true },
  });
  return bookNames.map((book) => book.title);
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { author: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
  return books;
};
