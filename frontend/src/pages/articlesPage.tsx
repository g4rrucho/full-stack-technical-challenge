import { useCallback } from "react";
import { useNavigate } from "react-router";
import { AlertCircle } from "lucide-react";

import { useArticles } from "@/api/articles.queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ArticleListSkeleton = () => (
  <div className="container mx-auto py-8 px-4 max-w-4xl">
    <Skeleton className="h-10 w-48 mb-8" />
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-32 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

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
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load articles. Please try again
          </AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={onRetry} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>
      <div className="space-y-4">
        {articles?.map((article) => (
          <Card
            key={article.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onArticleClick(article.id)}
          >
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>
                {new Date(article.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">
                {article.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
