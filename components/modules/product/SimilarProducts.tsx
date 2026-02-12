"use client";

import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "../landing/ProductCard";
import styles from "./similar-products.module.scss";

interface SimilarProductsProps {
  category: string;
  currentProductId: string;
}

export function SimilarProducts({
  category,
  currentProductId,
}: SimilarProductsProps) {
  const { products, isLoading, getProducts } = useProducts();

  // Fetch similar products when category changes
  useEffect(() => {
    if (category) {
      getProducts({ category, limit: 8 });
    }
  }, [category, getProducts]);

  // Filter out the current product and take only 4
  const similarProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading similar products...</div>
        </div>
      </section>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Similar Products</h2>
          <p>You might also like these products</p>
        </div>

        <div className={styles.grid}>
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
