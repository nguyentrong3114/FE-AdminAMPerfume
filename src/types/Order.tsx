// types/payment.ts

export interface OrderDTO {
    orderCode: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    address: string;
    method: string; 
    amount: number;
    shippingFee: number;
    totalAmount: number;
    isPaid: boolean;
    paidAt: string | null;
    status: string;
    transactionCode: string | null;
  }
  
  export interface OrderListResponse {
    items: OrderDTO[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }
  