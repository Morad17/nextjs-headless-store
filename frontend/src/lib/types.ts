// src/lib/types.ts
import { ReactNode } from "react";

// Product types
export interface ProductAttribute {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: {
    url: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For additional dynamic attributes
}

// Main product interface
export interface Product {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  price: number;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category?: ProductAttribute;
  subCategory?: ProductAttribute;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For additional dynamic attributes
}

// Category interface
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  required: boolean;
  products?: Product[];
}

// Order item interface
export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  isMainComponent: boolean;
}

// Customer interface
export interface Customer {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Order interface
export interface Order {
  id: number;
  documentId: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  orderItems: OrderItem[];
  customer?: Customer;
}

// API Response interfaces
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

export interface StrapiListResponse<T> {
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

// Store interfaces
export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
}

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface BuildPcState {
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  selectedCategoryId: number | null;
  selectedComponents: Record<number, Product>;
  showMainComponents: boolean;
}

// API Error interface
export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

// Auth interfaces
export interface User {
  id: string;
  username: string;
  email: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

// Generic component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Form interfaces
export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

// Modal interfaces
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Toast interfaces
export interface ToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

// Navigation interfaces
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
}

// Image interfaces
export interface ImageData {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export interface ImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

// Three.js / 3D Model interfaces
export interface ModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  children?: ReactNode;
}

// Three.js Material type (for when we can't import from three)
export interface Material {
  name?: string;
  color?: {
    r: number;
    g: number;
    b: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For other Three.js material properties
}

// Three.js Mesh type (for when we can't import from three)
export interface MeshNode {
  name: string;
  geometry: {
    attributes: Record<string, unknown>;
  };
  material: Material | Material[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For other Three.js mesh properties
}

// Pagination interface
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

// Search/Filter interfaces
export interface FilterOptions {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: "name" | "price" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface SearchParams {
  query?: string;
  filters?: FilterOptions;
  page?: number;
  pageSize?: number;
}

// Cart/Order interfaces
export interface CartItem extends OrderItem {
  id: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Component state interfaces
export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
}

export interface ErrorState {
  hasError: boolean;
  errorMessage?: string;
  errorCode?: string | number;
}

// Form validation interfaces
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean | string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  validation?: ValidationRule;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
}

// Animation/Motion interfaces
export interface AnimationProps {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  delay?: number;
}

// Theme/Styling interfaces
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Environment/Config interfaces
export interface AppConfig {
  strapiUrl: string;
  strapiApiToken: string;
  environment: "development" | "production" | "test";
  version: string;
}
