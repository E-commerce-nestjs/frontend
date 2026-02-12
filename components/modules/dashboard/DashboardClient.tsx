"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useOrder } from "@/hooks/useOrder";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.scss";

export function DashboardClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { orders, getUserOrders, isLoading } = useOrder();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/user");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getUserOrders(1, 10);
    }
  }, [isAuthenticated]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const totalOrders = orders.length;
  const processingOrders = orders.filter(
    (o) => o.status === "PROCESSING"
  ).length;
  const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <h1 className={styles.title}>Dashboard</h1>

        <div className={styles.cardsGrid}>
          <Link href="/user/orders" className={styles.card}>
            <div className={styles.cardIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Total Orders</h3>
              <p className={styles.cardValue}>{totalOrders}</p>
            </div>
          </Link>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Processing</h3>
              <p className={styles.cardValue}>{processingOrders}</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Completed</h3>
              <p className={styles.cardValue}>{completedOrders}</p>
            </div>
          </div>
        </div>

        {isLoading && <p className={styles.loading}>Loading orders...</p>}
      </div>
    </div>
  );
}
