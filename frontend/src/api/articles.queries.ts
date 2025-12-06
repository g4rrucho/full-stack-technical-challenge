import { useQuery } from "@tanstack/react-query";

import type { ArticleDto } from "@/api/types/article";
import { articlesApi } from "@/api/articles";

export const useArticles = () =>
  useQuery<ArticleDto[]>({
    queryKey: ["articles"],
    queryFn: articlesApi.getAll,
  });

export const useArticle = (id: string) =>
  useQuery<ArticleDto>({
    queryKey: ["article", id],
    queryFn: () => articlesApi.getById(id),
    enabled: !!id,
  });
