import cron from "node-cron";
import { generateArticle } from "@/services/aiClient";
import { createArticle } from "@/services/articles";

export function startArticleScheduler() {
  cron.schedule("0 0 * * *", async () => {
    console.log("[CRON] Running scheduled article generation...");
    try {
      const article = await generateArticle();
      await createArticle(article.title, article.content);
      console.log("[CRON] Article generated successfully:", article.title);
    } catch (error) {
      console.error("[CRON] Failed to generate article:", error);
    }
  });

  console.log("✓ Article scheduler started (runs daily at midnight)");
}

export async function generateArticleNow() {
  console.log("Generating article now...");
  try {
    const article = await generateArticle();
    const created = await createArticle(article.title, article.content);
    console.log("✓ Article generated:", created.title);
    return created;
  } catch (error) {
    console.error("Failed to generate article:", error);
    throw error;
  }
}
