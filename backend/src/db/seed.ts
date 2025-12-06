import dotenv from "dotenv";

import { SEED_ARTICLES } from "@/constants/articles";
import { query } from "@/db/client";
import { createArticle } from "@/services/articles";

dotenv.config();

export async function seedDatabaseIfEmpty() {
  try {
    const result = await query("SELECT COUNT(*) as count FROM articles");
    const count = parseInt(result.rows[0].count, 10);

    if (count === 0) {
      console.log("Database is empty. Seeding initial data...");
      for (const article of SEED_ARTICLES) {
        await createArticle(article.title, article.content);
        console.log(`Seeded article: ${article.title}`);
      }
      console.log("Database seeded successfully!");
    } else {
      console.log(`Database already has ${count} articles. Skipping seeding.`);
    }
  } catch (err) {
    throw new Error("Failed to check database for seeding\n" + err);
  }
}
