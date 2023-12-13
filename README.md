# book-list-api
Internship 2023 - Book List API (NestJS with authentication and authorization, Prisma, PostgreSQL)

This is a simple CRUD API project to practice working with NestJs, PostgreSQL and Prisma ORM. Users can sign up to add books and categories to favoutes.

# Running the app

If you want to run only the database in Docker, change host from "postgres" to "localhost" in db.env and in .env files, and comment out the backend and pgadmin services from the docker-compose file. After that run <b>$npm install</b>.

To start the containers, run <b>$docker-compose up</b>. Next, run (in Docker CLI for backend image, or if using Docker only for the database, in regular CLI) <b>$npx prisma migrate dev</b> to sync the database with the schema, and then run <b>$npx prisma db seed</b> to populate the database with sample data.

# Project structure

The prisma folder contains the schema.prisma file, where the database models are specified, the seed.ts file, used to populate the database and a migrations folder. Docker-related files and files containing environment variables are in the root directory. Other project files are in the src folder, has the following structure:
- the entry file (main.ts) and the main (app) module;
- app folder, containing all the resources (with a module, a controller and a service for each one): auth, books, categories and users;
- domain folder, containing all the dtos, entities and repos (services to interact with the database - for each model);
- libs folder, containing a prisma folder with the prisma module and service, and a security folder with passport strategies, authentication and authorization guards and decorators and a role enum. 

# Description

The database schema includes models for books, categories and users (all relations are MANY-To-MANY). A book may have many categories, and a category may have many books. And a user can mark multiple books and categories as favourite. 

The API implements passport jwt strategy for acces tokens as well as refresh token rotation for authentication and authorization. Some routes are public, others are protected. Some of the protected routes require a user to have a certain role. 

When a user is created (when they sign up), they are not automatically authenticated. Sign-up route is handled by the users controller, not by the auth controller.

Public routes - routes that are accessible for everyone, including unauthenticated users:
1. POST "/auth/login" to sign in, 
2. POST "/users" to sign up, 
3. GET "/books" to view all books,
4. GET "/books/:bookId" to view a particaular book,
5. GET "/categories" to view all categories,
6. GET "/categories/:categoryId" to view a particaular category.

Roles:
1. <b>user</b> - an authenticated user can mark books and categories as favourites and delete books and categories from favourites, a regular user can also update their own information() and delete themselves;
2. <b>admin</b> - an admin can add, update (update the general info of a book or a category and connect books with categories and categories with books) and delete books and categories;
3. <b>super-admin</b> - a super-admin can view and delete users, and can assign different roles to users.

So, only the user themselves can change their information. A super-admin can only view (password field is excluded) or delete a user, and modify their role and not the other information.

Used features and techniques:
- using @Body(), @Request(), @Param() in route handlers,
- excluding passwords from the response with an interceptor,
- implementing basic validation with a validation pipe using class-validator and class-transformer,
- using bcrypt to hash passwords and refresh tokens,
- using passport to configure jwt and refresh token strategies,
- using a global jwt-auth guard for authentication and a public decorator to make some routes public,
- using a roles guard with a roles decorator for authorization to specify necessary roles to acces routes,
- using config module to use environment variables (including authentication secrets).