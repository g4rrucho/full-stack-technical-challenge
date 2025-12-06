import { Navigate, Route, Routes } from "react-router";

import ArticlesPage from "@/pages/articlesPage";
import ArticlesDetailsPage from "@/pages/articleDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/articles" replace />} />
      <Route path="/articles" Component={ArticlesPage} />
      <Route path="/articles/:id" Component={ArticlesDetailsPage} />
    </Routes>
  );
}

export default App;
