export interface Product {
    id: string;
    name: string;
    quantity: number;
    minimumQuantity: number;
    imageUrl: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    deletedAt: string | Date | null;
}

export interface Movement {
  id: string;
  productId: string;
  type: "in" | "out";
  amount: number;
  note?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}