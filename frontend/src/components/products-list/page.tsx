"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { Category } from "@/store/useBuildPcStore";
import ProductCard from "@/components/productCard/page";
import "./products-list.scss";

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

interface CategoryResponse {
  data: Category[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(
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
          ),
          fetch(
            `${
              process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
            }/api/categories?populate=*`,
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
                  ? `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
                  : "",
              },
            }
          ),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error(`HTTP error!`);
        }

        const productsData: StrapiResponse = await productsResponse.json();
        const categoriesData: CategoryResponse =
          await categoriesResponse.json();

        setProducts(productsData.data);
        setCategories(categoriesData.data);
        console.log("Fetched products:", productsData.data);
        console.log("Fetched categories:", categoriesData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to find category by product's pCategory
  const getCategoryForProduct = (product: Product): Category | undefined => {
    return categories.find((cat) => cat.id === product.pCategory?.id);
  };

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
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => {
            const category = getCategoryForProduct(product);
            return (
              <ProductCard
                key={product.id}
                product={product}
                maxAllowance={category?.maxAllowance || 1}
              />
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
