import api from "@/api/index"
import type { ProductListResponse } from "@/types/Product";
const ProductService = {
    async getProduct(page = 1, size = 10, search = ""): Promise<ProductListResponse> {
        const response = await api.get("/products", {
            params: { page, size, search },
        });

        const data = response.data;
        console.log(data)
        return {
            items: data.items ?? [],
            totalItems: data.totalItems ?? 0,
        };
    },

    getProductById: async (id: string) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    createProduct: async (productData: any) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    updateProduct: async (id: string, productData: any) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    deleteProduct: async (id: string) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
}

export default ProductService;
