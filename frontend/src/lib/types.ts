// src/lib/types.ts
export interface Product {
  id: string;
  attributes: {
    name: string;
    description: string;
    price: number;
    slug: string;
    featured?: boolean;
    stock: number;
    createdAt: string;
    updatedAt: string;
    images: {
      data: Array<{
        attributes: {
          url: string;
          alternativeText?: string;
        };
      }>;
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
  };
}

export interface Category {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description?: string;
  };
}

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}
