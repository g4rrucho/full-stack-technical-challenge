import { query } from "@/db/client";

export type Article = {
  id: number;
  title: number;
  content: string;
  created_at: string;
};

export const getAllArticles = async (): Promise<Article[]> => {
  const res = await query("SELECT * FROM articles ORDER BY created_at DESC");
  return res.rows;
};

export const getArticleById = async (id: number): Promise<Article | null> => {
  const res = await query("SELECT * FROM articles WHERE id = $1", [id]);
  return res.rows[0] || null;
};

export const createArticle = async (
  title: string,
  content: string
): Promise<Article> => {
  const res = await query(
    "INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );

  return res.rows[0];
};
