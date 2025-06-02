import api from "@/api";
import type { Category, CategoryListResponse } from "@/types/Category";

export const categoriesService = {
    getCategories: async () => {
        const response = await api.get(`/categories`);
        return response.data;
    },
    createCategory: async (category: Category) => {
        const response = await api.post(`/categories`, category);
        return response.data;
    },
    updateCategory: async (category: Category) => {
        const response = await api.put(`/categories/${category.id}`, category);
        return response.data;
    },
    deleteCategory: async (id: string) => {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    }   
}
