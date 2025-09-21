"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useBasket } from "@/context/BasketContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToBasket } = useBasket();

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.attributes.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={
              product.attributes.images.data[0]?.attributes.alternativeText ||
              product.attributes.name
            }
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.attributes.slug}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
            {product.attributes.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.attributes.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${product.attributes.price}
          </span>

          <button
            onClick={handleAddToBasket}
            disabled={product.attributes.stock <= 0}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              product.attributes.stock <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {product.attributes.stock <= 0 ? "Out of Stock" : "Add to Basket"}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Stock: {product.attributes.stock}
        </p>
      </div>
    </div>
  );
}
