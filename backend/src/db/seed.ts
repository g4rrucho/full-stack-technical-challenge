import dotenv from "dotenv";

import { initDatabase } from "@/db/client";
import { createArticle } from "@/services/articles";

dotenv.config();

const seedArticles = [
  {
    title: "Getting Started with TypeScript",
    content: `TypeScript has revolutionized the way we write JavaScript by adding static typing and 
  modern language features. This powerful superset of JavaScript helps catch errors early in 
  development and provides excellent tooling support.

  In this article, we'll explore the fundamentals of TypeScript, including type annotations, 
  interfaces, and generics. Whether you're building a small project or a large-scale application, 
  TypeScript can help you write more maintainable and robust code.

  The key benefits include better IDE support, improved code documentation through types, and the 
  ability to catch bugs before runtime. As the JavaScript ecosystem continues to evolve, TypeScript 
  has become an essential tool for modern web development.`,
  },
  {
    title: "Building Scalable APIs with Node.js",
    content: `Node.js has become the go-to platform for building fast and scalable server-side 
  applications. Its event-driven, non-blocking I/O model makes it perfect for data-intensive real-time
   applications that run across distributed devices.

  When building APIs with Node.js, choosing the right framework is crucial. Fastify stands out for its
   performance and developer experience, offering a plugin-based architecture that makes it easy to 
  extend and maintain your application.

  Key considerations include proper error handling, implementing rate limiting, using environment 
  variables for configuration, and structuring your code for maintainability. With the right patterns 
  and practices, you can build APIs that handle thousands of requests per second while remaining easy 
  to understand and modify.`,
  },
  {
    title: "Database Design Best Practices",
    content: `Effective database design is the foundation of any successful application. Whether 
  you're using PostgreSQL, MySQL, or another relational database, following best practices ensures 
  your application scales well and remains performant as data grows.

  Start by understanding your data model and relationships. Use appropriate data types, create indexes
   on frequently queried columns, and normalize your schema to reduce redundancy. However, remember 
  that sometimes denormalization is acceptable for performance reasons.

  Consider using migrations to version control your database schema changes, implement proper 
  constraints to maintain data integrity, and always plan for backups and disaster recovery. A 
  well-designed database can mean the difference between an application that scales gracefully and one
   that becomes a bottleneck as your user base grows.`,
  },
];

async function seed() {
  try {
    await initDatabase();

    for (const article of seedArticles) {
      await createArticle(article.title, article.content);
      console.log(`Seeded article: ${article.title}`);
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.log("Error during seeding:", error);
    process.exit(1);
  }
}

seed();
