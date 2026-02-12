"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product.types";
import styles from "./product-card.module.scss";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock > 0;

  // Generate slug from product id or name
  const id = product.id;

  return (
    <Link href={`/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={
            product.imageUrl.trimEnd() ??
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80"
          }
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{product.categoryId}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <span
            className={`${styles.stock} ${!isInStock ? styles.outOfStock : ""}`}
          >
            {isInStock ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}
