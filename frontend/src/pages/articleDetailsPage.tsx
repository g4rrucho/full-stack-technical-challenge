import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

import { useArticle } from "@/api/articles.queries";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ArticleDetailSkeleton = () => (
  <div className="container mx-auto py-8 px-4 max-w-4xl">
    <Skeleton className="h-10 w-32 mb-6" />
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  </div>
);

const ArticleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useArticle(id as string);
  const navigate = useNavigate();

  if (isLoading) return <ArticleDetailSkeleton />;
  if (!data) return <div>Article not found</div>;

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

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{data.title}</CardTitle>
          <CardDescription>
            {new Date(data.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-lg leading-relaxed">
            {data.content}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleDetailsPage;
