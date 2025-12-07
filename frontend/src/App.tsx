import { Navigate, Route, Routes } from "react-router";

import ArticlesPage from "@/pages/articlesPage";
import ArticleDetailsPage from "@/pages/articleDetailsPage";
import Header from "@/components/blog-ui/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" Component={ArticlesPage} />
        <Route path="/articles/:id" Component={ArticleDetailsPage} />
      </Routes>
    </>
  );
}

export default App;
