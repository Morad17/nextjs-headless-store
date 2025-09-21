"use client";

import { useQuery } from "@apollo/client";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";
import { GET_PRODUCTS } from "@/lib/queries";
import { Product } from "@/lib/types";

export default function ProductsPage() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      pagination: { limit: 12 },
    },
  });

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">Error: {error.message}</div>
        </div>
      </div>
    );

  const products: Product[] = data?.products?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No products available.</p>
          </div>
        )}
      </main>
    </div>
  );
}
