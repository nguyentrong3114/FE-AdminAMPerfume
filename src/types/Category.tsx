export interface Category {
  id: string;
  name: string;
  description: string;
  products: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CategoryListResponse {
  items: Category[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
