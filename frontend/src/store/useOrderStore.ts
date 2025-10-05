import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Order, OrderItem, Product } from "@/lib/types";
import { useAuthStore } from "./useAuthStore";

interface OrderState {
  // Current order being built
  currentOrder: OrderItem[];
  orderLoading: boolean;
  orderError: string | null;

  // Order history
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;

  // Customer info
  customerInfo: {
    name: string;
    email: string;
  };

  // Actions
  addToOrder: (
    product: Product,
    quantity: number,
    category: string,
    isMainComponent: boolean
  ) => void;
  removeFromOrder: (productId: number) => void;
  updateOrderItemQuantity: (productId: number, quantity: number) => void;
  clearOrder: () => void;
  replaceOrderItem: (
    oldProductId: number,
    newProduct: Product,
    quantity: number,
    category: string,
    isMainComponent: boolean
  ) => void;

  // Customer actions
  setCustomerInfo: (name: string, email: string) => void;

  // API actions
  submitOrder: () => Promise<Order | null>;
  fetchOrders: () => Promise<void>;

  // Computed getters
  getOrderTotal: () => number;
  getMainComponents: () => OrderItem[];
  getAddOns: () => OrderItem[];
  getOrderItemCount: () => number;
  isOrderValid: () => boolean;
}

export const useOrderStore = create<OrderState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        currentOrder: [],
        orderLoading: false,
        orderError: null,

        orders: [],
        ordersLoading: false,
        ordersError: null,

        customerInfo: {
          name: "",
          email: "",
        },

        // Actions
        addToOrder: (
          product: Product,
          quantity: number,
          category: string,
          isMainComponent: boolean
        ) => {
          const { currentOrder } = get();
          const unitPrice = product?.price || product.price || 0;
          const totalPrice = unitPrice * quantity;

          // Check if product already exists in order
          const existingItemIndex = currentOrder.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex >= 0) {
            // Update existing item
            const updatedOrder = [...currentOrder];
            updatedOrder[existingItemIndex] = {
              ...updatedOrder[existingItemIndex],
              quantity,
              totalPrice: unitPrice * quantity,
            };
            set({ currentOrder: updatedOrder });
          } else {
            // Add new item
            const newItem: OrderItem = {
              product,
              quantity,
              unitPrice,
              totalPrice,
              category,
              isMainComponent,
            };
            set({ currentOrder: [...currentOrder, newItem] });
          }
        },

        removeFromOrder: (productId: number) => {
          const { currentOrder } = get();
          set({
            currentOrder: currentOrder.filter(
              (item) => item.product.id !== productId
            ),
          });
        },

        updateOrderItemQuantity: (productId: number, quantity: number) => {
          const { currentOrder } = get();
          const updatedOrder = currentOrder.map((item) => {
            if (item.product.id === productId) {
              return {
                ...item,
                quantity,
                totalPrice: item.unitPrice * quantity,
              };
            }
            return item;
          });
          set({ currentOrder: updatedOrder });
        },

        clearOrder: () => {
          set({ currentOrder: [] });
        },

        setCustomerInfo: (name: string, email: string) => {
          set({
            customerInfo: { name, email },
          });
        },

        submitOrder: async () => {
          const { currentOrder, customerInfo } = get();

          if (currentOrder.length === 0) {
            set({ orderError: "Order is empty" });
            return null;
          }

          set({ orderLoading: true, orderError: null });

          try {
            const orderNumber = `ORD-${Date.now()}`;
            const totalPrice = get().getOrderTotal();

            const orderData = {
              orderNumber,
              customerEmail: customerInfo.email,
              customerName: customerInfo.name,
              totalPrice,
              status: "pending",
              orderItems: currentOrder.map((item) => ({
                product: item.product.id,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.totalPrice,
                category: item.category,
                isMainComponent: item.isMainComponent,
              })),
            };

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${useAuthStore.getState().jwt}`,
                },
                body: JSON.stringify({ data: orderData }),
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Add to orders history
            set((state) => ({
              orders: [result.data, ...state.orders],
              orderLoading: false,
              currentOrder: [], // Clear current order after submission
            }));

            return result.data;
          } catch (error) {
            set({
              orderError:
                error instanceof Error
                  ? error.message
                  : "Failed to submit order",
              orderLoading: false,
            });
            return null;
          }
        },

        fetchOrders: async () => {
          set({ ordersLoading: true, ordersError: null });

          try {
            const response = await fetch(
              `${
                process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
              }/api/orders?populate=*&sort=createdAt:desc`,
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
              orders: data.data,
              ordersLoading: false,
            });
          } catch (error) {
            set({
              ordersError:
                error instanceof Error
                  ? error.message
                  : "Failed to fetch orders",
              ordersLoading: false,
            });
          }
        },

        // Computed getters
        getOrderTotal: () => {
          return get().currentOrder.reduce(
            (total, item) => total + item.totalPrice,
            0
          );
        },

        getMainComponents: () => {
          return get().currentOrder.filter((item) => item.isMainComponent);
        },

        getAddOns: () => {
          return get().currentOrder.filter((item) => !item.isMainComponent);
        },

        getOrderItemCount: () => {
          return get().currentOrder.reduce(
            (total, item) => total + item.quantity,
            0
          );
        },

        isOrderValid: () => {
          const { currentOrder, customerInfo } = get();
          const hasMainComponents = currentOrder.some(
            (item) => item.isMainComponent
          );
          const hasCustomerInfo =
            customerInfo.name.trim() !== "" && customerInfo.email.trim() !== "";

          return hasMainComponents && hasCustomerInfo;
        },

        replaceOrderItem: (
          oldProductId: number,
          newProduct: Product,
          quantity: number,
          category: string,
          isMainComponent: boolean
        ) => {
          const { currentOrder } = get();
          const unitPrice = newProduct?.price || newProduct.price || 0;
          const totalPrice = unitPrice * quantity;

          // Remove the old product and add the new one
          const updatedOrder = currentOrder.filter(
            (item) => item.product.id !== oldProductId
          );

          const newItem: OrderItem = {
            product: newProduct,
            quantity,
            unitPrice,
            totalPrice,
            category,
            isMainComponent,
          };

          set({ currentOrder: [...updatedOrder, newItem] });
        },
      }),
      {
        name: "order-store",
        partialize: (state) => ({
          currentOrder: state.currentOrder,
          customerInfo: state.customerInfo,
        }),
      }
    ),
    { name: "order-store" }
  )
);
