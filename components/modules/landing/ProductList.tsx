"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import styles from "./product-list.module.scss";

export function ProductList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 12;

  const { products, meta, isLoading, getProducts, error } = useProducts();

  useEffect(() => {
    getProducts({ page, limit, search: debouncedSearch });
  }, [page, limit, debouncedSearch, getProducts]);
  // Debounce search input
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);

      // Reset to page 1 when searching
      setPage(1);

      // Simple debounce with timeout
      setTimeout(() => {
        setDebouncedSearch(value);
      }, 500);
    },
    [],
  );

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (meta && page < meta.totalPages) setPage(page + 1);
  };

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.error}>
            Failed to load products. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our Products</h2>
          <p>Discover our curated collection of premium products</p>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading products...</div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>
            {debouncedSearch
              ? `No products found for "${debouncedSearch}"`
              : "No products available"}
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {products.length > 0 &&
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={page === 1}>
                  Previous
                </button>
                <span className={styles.pageInfo}>
                  Page {page} of {meta.totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page >= meta.totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
