import api from "@/api/index";

export const AnalyticService = {
    getAnalytics: async () => {
        const response = await api.get("/analytics")
        return response.data
    },
    postAnalytics: async (dates: {startDate?: string, endDate?: string}) => {
        const response = await api.post("/analytics", dates)
        return response.data
    }
}


