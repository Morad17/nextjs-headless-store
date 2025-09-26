// src/lib/types.ts

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  featured?: boolean;
  specifications?: Record<string, any>; // JSON field for dynamic specifications
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images?: {
    data: Array<{
      id: string;
      attributes: {
        name: string;
        alternativeText?: string;
        caption?: string;
        width: number;
        height: number;
        formats?: any;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: string;
        provider: string;
        provider_metadata?: any;
        createdAt: string;
        updatedAt: string;
      };
    }>;
  };
  pCategory?: {
    data: {
      id: string;
      name: string;
      slug: string;
      description?: any; // Blocks field
      containsSubCategories?: boolean;
      required: boolean;
      maxAllowance: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
  pSubCategory?: {
    data: {
      id: string;
      name: string;
      slug: string;
      description?: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
}

export interface Category {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description?: any; // Blocks field - can be rich content
    containsSubCategories?: boolean;
    required: boolean;
    maxAllowance: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sub_categories?: {
      data: SubCategory[];
    };
  };
}

export interface SubCategory {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category?: {
      data: Category;
    };
  };
}

// Updated BasketItem to match new structure
export interface BasketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; // Optional since images might not always be available
  slug: string;
  specifications?: Record<string, any>;
}

export interface CheckoutSession {
  id: string;
  url: string;
}

// Additional helper types for API responses
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollection<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// For filtering and querying
export interface ProductFilters {
  category?: string;
  subCategory?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

export interface CategoryFilters {
  containsSubCategories?: boolean;
  required?: boolean;
}

// Specification type for type-safe access to common spec fields
export interface ProductSpecifications {
  brand?: string;
  model?: string;
  // CPU specs
  cores?: number;
  threads?: number;
  baseClock?: string;
  boostClock?: string;
  socket?: string;
  tdp?: string;
  // GPU specs
  memory?: string;
  memoryBus?: string;
  cudaCores?: number;
  // Memory specs
  capacity?: string;
  speed?: string;
  type?: string;
  // Storage specs
  interface?: string;
  formFactor?: string;
  sequentialRead?: string;
  sequentialWrite?: string;
  // PSU specs
  wattage?: string;
  efficiency?: string;
  modular?: boolean;
  // Case specs
  motherboardSupport?: string[];
  dimensions?: string;
  weight?: string;
  // Generic fields
  [key: string]: any; // Allow for dynamic fields
}
