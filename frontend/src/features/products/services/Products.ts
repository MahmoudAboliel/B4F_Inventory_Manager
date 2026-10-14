import {
  getData,
  postData,
  patchData,
  deleteData,
} from "../../../core/http_methods";
import {
  base_url,
  products_url,
} from "../../../core/end_points";
import type { Product } from "../../../lib/types";

const productsEndpoint = `${base_url}${products_url}`;

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await getData(productsEndpoint);

  const products: Product[] = Array.isArray(response)
    ? response
    : response.data;

  return products.filter((product) => product.deletedAt === null);
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  const product: Product = await getData(
    `${productsEndpoint}/${id}`
  );

  if (product.deletedAt !== null) {
    return undefined;
  }

  return product;
};

export const addProduct = (data: Partial<Product>) =>
  postData(productsEndpoint, {
    ...data,
    quantity: Number(data.quantity),
    minimumQuantity: Number(data.minimumQuantity),
    deletedAt: null,
  });

export const updateProduct = (
  id: string,
  data: Partial<Product>
) =>
  patchData(`${productsEndpoint}/${id}`, {
    ...data,
    updatedAt: new Date().toISOString(),
  });

export const deleteProduct = (id: string) =>
  deleteData(`${productsEndpoint}/${id}`);

export const updateProductQuantity = (id: string,quantity: number) =>
  patchData(`${productsEndpoint}/${id}`, {
    quantity,
    updatedAt: new Date().toISOString(),
  });