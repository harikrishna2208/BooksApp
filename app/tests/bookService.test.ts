import { PrismaClient, Book } from '@prisma/client';
import * as BookService from '../api/services/bookService';

const prisma = new PrismaClient();

describe('BookService', () => {
  let bookService: typeof BookService;

  beforeAll(() => {
    bookService = BookService;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getBookById', () => {
    test('should retrieve a book by its ID', async () => {
      const createdBook = await prisma.book.create({
        data: {
          title: 'Sample Book',
          author: 'John Doe',
          publicationYear: 2022,
          description: '23232',
        },
      });

      const retrievedBook = await bookService.getBookById(createdBook.id);

      expect(retrievedBook).toEqual(createdBook);
    });

    test('should return null for non-existent book ID', async () => {
      const retrievedBook = await bookService.getBookById(123);

      expect(retrievedBook).toBeNull();
    });
  });
});
