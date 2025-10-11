import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product, StrapiListResponse } from "@/lib/types";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalProducts: number;

  // Actions
  fetchProducts: (
    categoryId?: number,
    page?: number,
    pageSize?: number
  ) => Promise<void>;
  setPage: (page: number) => void;
  clearProducts: () => void;
}

export const useProductsStore = create<ProductsState>()(
  devtools(
    (set) => ({
      // Remove unused 'get' parameter
      // Initial state
      products: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,

      // Actions
      fetchProducts: async (categoryId?: number, page = 1, pageSize = 12) => {
        set({ loading: true, error: null });

        try {
          let url = `${
            process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
          }/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

          if (categoryId) {
            url += `&filters[category][id][$eq]=${categoryId}`;
          }

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: StrapiListResponse<Product> = await response.json();

          set({
            products: data.data,
            currentPage: data.meta.pagination.page,
            totalPages: data.meta.pagination.pageCount,
            totalProducts: data.meta.pagination.total,
            loading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch products",
            loading: false,
          });
        }
      },

      setPage: (page: number) => {
        set({ currentPage: page });
      },

      clearProducts: () => {
        set({
          products: [],
          currentPage: 1,
          totalPages: 1,
          totalProducts: 0,
          error: null,
        });
      },
    }),
    { name: "products-store" }
  )
);
