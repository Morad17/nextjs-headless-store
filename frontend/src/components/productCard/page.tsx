import React from "react";
import Image from "next/image";
import "./productCard.scss";

interface ProductCardProps {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export default function ProductCard({
  title,
  imageUrl,
  description,
  price,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <Image src={imageUrl} alt={title} fill />
      </div>
      <div className="product-text">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <p className="product-cost">£{price.toFixed(2)}</p>
      </div>
      <div className="product-actions">
        <a href="">More Info</a>
        <a href="">Select</a>
      </div>
    </div>
  );
}
