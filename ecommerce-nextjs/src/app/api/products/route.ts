import { createProduct, listProducts } from "@/features/products/server/products.handlers";

export const GET = listProducts;
export const POST = createProduct;
