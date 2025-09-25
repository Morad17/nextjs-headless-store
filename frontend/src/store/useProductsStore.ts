import { create } from "zustand";
import { Product } from "@/lib/types";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;

  // Actions
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  // Initial state
  products: [],
  loading: true,
  error: null,

  // Actions
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Async action
  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
        }/api/products`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
              ? `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
              : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      set({
        products: data.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Failed to fetch products",
      });
    }
  },
}));
