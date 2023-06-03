# Node.js Application

This is a Node.js application built using TypeScript and PostgreSQL. It uses Prisma as the ORM (Object-Relational Mapping) tool.

## Requirements

- Node.js 18.15.0 or 16 LTS
- PostgreSQL 15.3

## Installation

1. Clone the repository:
  git clone https://github.com/harikrishna2208/BooksApp.git

2. Install the dependencies:
  cd your-repo
  npm install
3. Set up the database connection:
  Make sure you have a PostgreSQL server running, and update the database configuration in the .env file in the main folder. Replace the placeholders with your actual database credentials.
  DATABASE_URL=postgresql://username:password@localhost:5432/database_name


1. To start the application, run the following command: npm start
  
This will compile the TypeScript code to JavaScript and execute the dist/app.js file.

2. For development, you can use the following command to automatically restart the server when changes are made: npm run dev
3. To run the tests, use the following command: npm test
4. To manually build the TypeScript code, use the following command: npm run build



