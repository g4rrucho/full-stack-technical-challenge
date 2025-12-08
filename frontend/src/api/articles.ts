import type { ArticleDto } from "@/api/types/article";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const articlesApi = {
  getAll: async (): Promise<ArticleDto[]> => {
    const res = await axios.get<ArticleDto[]>(`${API_URL}/articles`);
    return res.data;
  },
  getById: async (id: string): Promise<ArticleDto> => {
    const res = await axios.get<ArticleDto>(`${API_URL}/articles/${id}`);
    return res.data;
  },
};
