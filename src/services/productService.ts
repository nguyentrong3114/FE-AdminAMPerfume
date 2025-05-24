import api from "@/api/index"

const ProductService = {
    getProducts: async () => {
        const response = await api.get('/products');
        return response.data;
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
