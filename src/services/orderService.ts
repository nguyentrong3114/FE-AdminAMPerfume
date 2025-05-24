import api from "@/api"

export const OrderService = {
    async getOrders(page = 1, size = 10, search = ""): Promise<OrderListResponse> {
        const response = await api.get("/orders", {
            params: { page, size, search },
        });

        const data = response.data;
        console.log(data)
        return {
            items: data.items ?? [],
            totalItems: data.totalItems ?? 0,
        };
    },
};
