import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "@/lib/types";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  required: boolean;
  order?: number;
  maxAllowance: number;
  products?: {
    data: Product[];
  };
}

export interface SelectedComponent {
  categoryId: number;
  categoryName: string;
  product: Product;
}

interface BuildPcState {
  // Categories
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;

  // Products for selected category
  currentCategoryProducts: Product[];
  productsLoading: boolean;
  productsError: string | null;

  // Selected state
  selectedCategoryId: number | null;
  selectedComponents: SelectedComponent[];

  // UI state
  showRequiredOnly: boolean;

  // Actions
  fetchCategories: () => Promise<void>;
  selectCategory: (categoryId: number) => Promise<void>;
  selectProductForCategory: (
    product: Product,
    categoryId: number,
    categoryName: string
  ) => void;
  removeComponentFromCategory: (categoryId: number) => void;
  toggleShowRequiredOnly: () => void;

  // Computed getters
  getRequiredCategories: () => Category[];
  getOptionalCategories: () => Category[];
  getSelectedComponentForCategory: (
    categoryId: number
  ) => SelectedComponent | undefined;
  getUnselectedRequiredCategories: () => Category[];
  getTotalPrice: () => number;
  isBuildComplete: () => boolean;
}

export const useBuildPcStore = create<BuildPcState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        categories: [],
        categoriesLoading: false,
        categoriesError: null,

        currentCategoryProducts: [],
        productsLoading: false,
        productsError: null,

        selectedCategoryId: null,
        selectedComponents: [],

        showRequiredOnly: false,

        // Actions
        fetchCategories: async () => {
          set({ categoriesLoading: true, categoriesError: null });

          try {
            const response = await fetch(
              `${
                process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
              }/api/categories?sort*=order:asc`,
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
              categories: data.data,
              categoriesLoading: false,
            });
          } catch (error) {
            set({
              categoriesError:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch categories",
              categoriesLoading: false,
            });
          }
        },

        selectCategory: async (categoryId: number) => {
          const { categories } = get();
          const category = categories.find((cat) => cat.id === categoryId);

          if (!category) return;

          set({
            selectedCategoryId: categoryId,
            productsLoading: true,
            productsError: null,
          });

          try {
            const response = await fetch(
              `${
                process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
              }/api/products?populate=*&filters[category][id][$eq]=${categoryId}`,
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
              currentCategoryProducts: data.data,
              productsLoading: false,
            });
          } catch (error) {
            set({
              productsError:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch products",
              productsLoading: false,
            });
          }
        },

        selectProductForCategory: (
          product: Product,
          categoryId: number,
          categoryName: string
        ) => {
          const { selectedComponents } = get();

          // Remove existing component for this category if any
          const updatedComponents = selectedComponents.filter(
            (comp) => comp.categoryId !== categoryId
          );

          // Add new component
          updatedComponents.push({
            categoryId,
            categoryName,
            product,
          });

          set({ selectedComponents: updatedComponents });
        },

        removeComponentFromCategory: (categoryId: number) => {
          const { selectedComponents } = get();
          set({
            selectedComponents: selectedComponents.filter(
              (comp) => comp.categoryId !== categoryId
            ),
          });
        },

        toggleShowRequiredOnly: () => {
          set({ showRequiredOnly: !get().showRequiredOnly });
        },

        // Computed getters
        getRequiredCategories: () => {
          return get().categories.filter((cat) => cat.required);
        },

        getOptionalCategories: () => {
          return get().categories.filter((cat) => !cat.required);
        },
        getSortedCategories: () => {
          return get().categories.filter((cat) => !cat.required);
        },

        getSelectedComponentForCategory: (categoryId: number) => {
          return get().selectedComponents.find(
            (comp) => comp.categoryId === categoryId
          );
        },

        getUnselectedRequiredCategories: () => {
          const { selectedComponents } = get();
          const selectedCategoryIds = selectedComponents.map(
            (comp) => comp.categoryId
          );

          return get()
            .getRequiredCategories()
            .filter((cat) => !selectedCategoryIds.includes(cat.id));
        },

        getTotalPrice: () => {
          return get().selectedComponents.reduce(
            (total, component) => total + (component.product?.price || 0),
            0
          );
        },

        isBuildComplete: () => {
          const unselectedRequired = get().getUnselectedRequiredCategories();
          return unselectedRequired.length === 0;
        },
      }),
      {
        name: "build-pc-store",
        partialize: (state) => ({
          selectedComponents: state.selectedComponents,
        }),
      }
    ),
    { name: "build-pc-store" }
  )
);
