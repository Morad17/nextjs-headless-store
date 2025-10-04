import Image from "next/image";
import React from "react";
import placeholder from "../../../public/assets/images/placeholder-image.png";
import "./order-product-card.scss";

interface OrderProductCardProps {
  component: {
    product: any;
    category: string;
    quantity: number;
    totalPrice: number;
  };
}

export default function OrderProductCard({ component }: OrderProductCardProps) {
  const getImageUrl = (product: any) => {
    try {
      if (
        product.images &&
        Array.isArray(product.images) &&
        product.images.length > 0
      ) {
        const imageUrl = product.images[0].url;
        if (imageUrl) {
          return imageUrl.startsWith("http")
            ? imageUrl
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`;
        }
      }
      return placeholder;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return placeholder;
    }
  };

  return (
    <div className="order-component-card">
      <div className="order-card-image">
        <Image
          src={getImageUrl(component.product)}
          alt={component.category}
          width={200}
          height={150}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="order-card-title">
        <h3>{component.category}</h3>
      </div>
    </div>
  );
}
