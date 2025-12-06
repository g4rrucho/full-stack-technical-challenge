import dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";

import { initDatabase } from "./db/client";
import { articleRoutes } from "@/routes/articles";
import { startArticleScheduler } from "@/services/articleJob";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3000", 10);

const fastify = Fastify({
  logger: true,
});

async function main() {
  try {
    await initDatabase();
    await startArticleScheduler();

    await fastify.register(cors, { origin: true });
    await fastify.register(articleRoutes, { prefix: "/api" });

    fastify.get("/health", async () => {
      return { status: "ok" };
    });

    await fastify.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
