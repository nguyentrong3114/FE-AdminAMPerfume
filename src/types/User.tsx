// types/user.ts
export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
    fullName?: string;
    role: string;
    status?: string;
  }
  export interface UserResponse {
    items: User[];
    totalItems: number;
  }