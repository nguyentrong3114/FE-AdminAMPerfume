import api from "@/api/index";
import type { UserResponse } from "@/types/User";

const UserService = {
    async getUsers(page = 1, size = 10, search = ""): Promise<UserResponse> {
        const response = await api.get("/users", {
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

export default UserService;
