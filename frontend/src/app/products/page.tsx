"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/productCard/page";
import "./products.scss";

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Populate relations to get category/subcategory data and images
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
          }/api/products?populate=*`,
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
        console.log("Fetched products:", data.data);
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

  if (loading) {
    return (
      <div className="products-loading">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
            // <div className="">{product.name}</div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
