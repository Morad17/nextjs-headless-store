"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { GET_PRODUCT_BY_SLUG } from "@/lib/queries";
import { Product } from "@/lib/types";
import { useBasket } from "@/context/BasketContext";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToBasket } = useBasket();

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
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

  const product: Product = data?.products?.data?.[0];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Product not found</div>
        </div>
      </div>
    );
  }

  const handleAddToBasket = () => {
    if (product.attributes.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    const basketItem = {
      id: product.id,
      name: product.attributes.name,
      price: product.attributes.price,
      image:
        product.attributes.images.data[0]?.attributes.url || "/placeholder.jpg",
      slug: product.attributes.slug,
    };

    addToBasket(basketItem);
    toast.success("Added to basket!");
  };

  const imageUrl = product.attributes.images.data[0]?.attributes.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${
        product.attributes.images.data[0].attributes.url
      }`
    : "/placeholder.jpg";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="relative h-96">
              <Image
                src={imageUrl}
                alt={product.attributes.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.attributes.name}
              </h1>

              <p className="text-gray-600 mb-6">
                {product.attributes.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ${product.attributes.price}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Stock: {product.attributes.stock} available
                </p>
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  {product.attributes.category?.data?.attributes?.name}
                </p>
              </div>

              <button
                onClick={handleAddToBasket}
                disabled={product.attributes.stock <= 0}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  product.attributes.stock <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {product.attributes.stock <= 0
                  ? "Out of Stock"
                  : "Add to Basket"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
