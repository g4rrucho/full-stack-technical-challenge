import { SEED_ARTICLES } from "@/constants/articles";
import { initDatabase, query } from "@/db/client";
import { createArticle } from "@/services/articles";

export async function seed() {
  try {
    await initDatabase();

    for (const article of SEED_ARTICLES) {
      await createArticle(article.title, article.content);
      console.log(`Seeded article: ${article.title}`);
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.log("Error during seeding:", error);
    process.exit(1);
  }
}
