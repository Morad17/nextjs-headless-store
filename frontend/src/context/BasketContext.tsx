// src/context/BasketContext.tsx
"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { BasketItem } from "@/lib/types";

interface BasketState {
  items: BasketItem[];
  total: number;
  itemCount: number;
}

interface BasketContextType extends BasketState {
  addToBasket: (item: Omit<BasketItem, "quantity">) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

type BasketAction =
  | { type: "ADD_TO_Basket"; payload: Omit<BasketItem, "quantity"> }
  | { type: "REMOVE_FROM_Basket"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_Basket" }
  | { type: "LOAD_Basket"; payload: BasketItem[] };

const BasketReducer = (
  state: BasketState,
  action: BasketAction
): BasketState => {
  switch (action.type) {
    case "ADD_TO_Basket": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return calculateTotals({ ...state, items: updatedItems });
      }

      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return calculateTotals({ ...state, items: newItems });
    }

    case "REMOVE_FROM_Basket": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return calculateTotals({ ...state, items: newItems });
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        return calculateTotals({ ...state, items: newItems });
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return calculateTotals({ ...state, items: updatedItems });
    }

    case "CLEAR_Basket":
      return { items: [], total: 0, itemCount: 0 };

    case "LOAD_Basket":
      return calculateTotals({ ...state, items: action.payload });

    default:
      return state;
  }
};

const calculateTotals = (state: BasketState): BasketState => {
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  return { ...state, total, itemCount };
};

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(BasketReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  useEffect(() => {
    const savedBasket = localStorage.getItem("Basket");
    if (savedBasket) {
      dispatch({ type: "LOAD_Basket", payload: JSON.parse(savedBasket) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Basket", JSON.stringify(state.items));
  }, [state.items]);

  const addToBasket = (item: Omit<BasketItem, "quantity">) => {
    dispatch({ type: "ADD_TO_Basket", payload: item });
  };

  const removeFromBasket = (id: string) => {
    dispatch({ type: "REMOVE_FROM_Basket", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearBasket = () => {
    dispatch({ type: "CLEAR_Basket" });
  };

  return (
    <BasketContext.Provider
      value={{
        ...state,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
