import type { ArticleDto } from "@/api/types/article";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type React from "react";

const ArticleDetailsCard: React.FC<ArticleDto> = ({
  title,
  content,
  created_at,
}) => {
  const date = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line text-lg leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
};

export default ArticleDetailsCard;
