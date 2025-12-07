import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useArticles } from "@/api/articles.queries";
import ErrorState from "@/components/blog-ui/common/ErrorState";
import ArticleListSkeleton from "@/components/blog-ui/articles/ArticleListSkeleton";
import ArticleCard from "@/components/blog-ui/articles/ArticleCard";

const ArticlesPage = () => {
  const { data: articles, isLoading, isError, refetch } = useArticles();
  const navigate = useNavigate();

  const onRetry = useCallback(() => refetch(), [refetch]);

  const onArticleClick = useCallback(
    (id: string) => navigate(`/articles/${id}`),
    [navigate]
  );

  if (isLoading) return <ArticleListSkeleton />;
  if (isError)
    return (
      <ErrorState
        message="Failed to load articles. Please try again"
        onClick={onRetry}
      />
    );

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>
      <div className="space-y-4">
        {articles?.map((article) => (
          <ArticleCard
            key={`${article.id}`}
            article={article}
            onClick={onArticleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
