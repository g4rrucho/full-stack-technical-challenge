import React from "react";
import type { ArticleDto } from "@/api/types/article";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ArticleCardProps = {
  article: ArticleDto;
  onClick: (id: string) => void;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const date = new Date(article.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(article.id)}
    >
      <CardHeader>
        <CardTitle className="md:text-xl">{article.title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{article.content}</p>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
