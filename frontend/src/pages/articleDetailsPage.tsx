import { useParams } from "react-router";
import { useArticle } from "@/api/articles.queries";

const ArticlesDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useArticle(id as string);

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
      <small>{data?.created_at}</small>
    </div>
  );
};

export default ArticlesDetailsPage;
