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
  maxAllowance?: number;
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

  showMainComponents: boolean; // true = main components, false = add-ons

  // Actions
  fetchCategories: () => Promise<void>;
  fetchProductsByCategory: (categoryId: number) => Promise<void>; // Add this line
  selectCategory: (categoryId: number) => void;
  selectProductForCategory: (
    product: Product,
    categoryId: number,
    categoryName: string
  ) => void;
  removeComponentFromCategory: (categoryId: number) => void;
  toggleComponentType: (showMain: boolean) => void; // Add this action

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

        showMainComponents: true, // Start with main components

        // Actions
        fetchCategories: async () => {
          set({ categoriesLoading: true, categoriesError: null });

          try {
            const response = await fetch(
              `${
                process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
              }/api/categories?sort=order:asc`,
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

        // Add this new function
        fetchProductsByCategory: async (categoryId: number) => {
          const { categories } = get();
          const category = categories.find((cat) => cat.id === categoryId);

          if (!category) {
            set({ productsError: "Category not found" });
            return;
          }

          set({
            productsLoading: true,
            productsError: null,
          });

          try {
            // Filter products by category name matching pCategory.name
            const response = await fetch(
              `${
                process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
              }/api/products?populate=*&filters[pCategory][name][$eq]=${encodeURIComponent(
                category.name
              )}`,
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

        selectCategory: (categoryId: number) => {
          set({ selectedCategoryId: categoryId });
          // Optionally auto-fetch products when category is selected
          get().fetchProductsByCategory(categoryId);
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

        // Add this new action
        toggleComponentType: (showMain: boolean) => {
          set({ showMainComponents: showMain });
        },

        // Computed getters
        getRequiredCategories: () => {
          return get().categories.filter((cat) => cat.required);
        },

        getOptionalCategories: () => {
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
            (total, component) =>
              total +
              (component.product?.price || component.product.price || 0),
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
          showMainComponents: state.showMainComponents, // Persist this state
        }),
      }
    ),
    { name: "build-pc-store" }
  )
);
