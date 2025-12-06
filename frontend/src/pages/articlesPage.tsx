import { useCallback } from "react";
import { useNavigate } from "react-router";

import { useArticles } from "@/api/articles.queries";

const ArticlesPage = () => {
  const { data } = useArticles();
  const navigate = useNavigate();

  const onArticleClick = useCallback(
    (id: string) => navigate(`/articles/${id}`),
    [navigate]
  );

  return (
    <div className="items-center justify-center flex flex-col mx-48 my-4">
      <h1 className="text-lg font-bold">Articles</h1>
      <div className="gap-4 flex flex-col">
        {data?.map((article) => (
          <div
            onClick={() => onArticleClick(article.id)}
            key={article.id}
            className="border p-4 m-2"
          >
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="line-clamp-2">{article.content}</p>
            <small>{article.created_at}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
