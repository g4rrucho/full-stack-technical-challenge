import { FastifyInstance } from "fastify";

import { getAllArticles, getArticleById } from "@/services/articles";

export async function articleRoutes(fastify: FastifyInstance) {
  fastify.get("/articles", async (_request, reply) => {
    try {
      const articles = await getAllArticles();
      return reply.send(articles);
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: "Failed to fetch articles" });
    }
  });

  fastify.get<{ Params: { id: string } }>(
    "/articles/:id",
    async (request, reply) => {
      try {
        const { id } = request.params;
        const article = await getArticleById(parseInt(id, 10));

        if (!article)
          return reply.status(404).send({ error: "Article not found" });

        return reply.send(article);
      } catch (err) {
        fastify.log.error(err);
        return reply.status(500).send({ error: "Failed to fetch article" });
      }
    }
  );
}
