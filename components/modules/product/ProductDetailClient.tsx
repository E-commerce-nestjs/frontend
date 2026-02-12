"use client";

import { useProducts } from "@/hooks/useProducts";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProductDetail } from "./ProductDetail";
import { SimilarProducts } from "./SimilarProducts";
import styles from "./product-detail-client.module.scss";
import { useEffect } from "react";

interface ProductDetailClientProps {
  productId: string;
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { product, getProduct, isLoading, error } = useProducts();
  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, [productId, getProduct]);
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.container}>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.error}>
        <div className={styles.container}>
          <h2>Product Not Found</h2>
          <p>
            The product you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs productName={product.name} />
      <ProductDetail product={product} />
      <SimilarProducts
        category={product.categoryId}
        currentProductId={product.id}
      />
    </>
  );
}
