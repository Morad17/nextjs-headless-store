"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";

interface StrapiResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export default function page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
          }/api/products?populate=images,category`,
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

        const data: StrapiResponse = await response.json();
        setProducts(data.data);
        console.log(products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return <div>page</div>;
}
