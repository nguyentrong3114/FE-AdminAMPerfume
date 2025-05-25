import api from "@/api/index";

export const AnalyticService = {
    getAnalytics: async () => {
        const response = await api.get("/analytics")
        return response.data
    }
}

