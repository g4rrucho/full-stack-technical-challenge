import dotenv from "dotenv";
import { generateArticle } from "@/services/aiClient";

dotenv.config();

async function test() {
  try {
    console.log("Testing AI article generation...\n");
    const article = await generateArticle();
    console.log("✓ Success!\n");
    console.log("Title:", article.title);
    console.log("\nContent:", article.content);
  } catch (error) {
    console.error("✗ Failed:", error);
  }
}

test();
