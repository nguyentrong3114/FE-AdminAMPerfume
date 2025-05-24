// types/product.ts

export interface ProductVariant {
    id: number;
    size: string;
    price: number;
    quantity: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    star: number;
    brandId: number;
    brandName: string;
    notes: string[]; // hiện là mảng rỗng
    images: string[];
    variants: ProductVariant[];
}

export interface ProductListResponse {
    items: Product[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
