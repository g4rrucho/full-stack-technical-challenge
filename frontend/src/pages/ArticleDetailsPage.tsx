import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import { useArticle } from "@/api/articles.queries";
import { Button } from "@/components/ui/button";
import ErrorState from "@/components/blog-ui/common/ErrorState";
import ArticleDetailsSkeleton from "@/components/blog-ui/articles/ArticleDetailsSkeleton";
import ArticleDetailsCard from "@/components/blog-ui/articles/ArticleDetailsCard";

const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useArticle(id as string);
  const navigate = useNavigate();

  const onRetry = useCallback(() => refetch(), [refetch]);

  if (isLoading) return <ArticleDetailsSkeleton />;
  if (isError || !article)
    return (
      <ErrorState
        message="Failed to load article. Please try again."
        onClick={onRetry}
      />
    );

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/articles")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Articles
      </Button>

      <ArticleDetailsCard {...article} />
    </div>
  );
};

export default ArticleDetailsPage;
