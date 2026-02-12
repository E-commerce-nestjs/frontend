"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import styles from "./orders.module.scss";
import { OrderItemDetail } from "@/types/order.types";

export function OrdersClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { orders, pagination, getUserOrders, isLoading } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/user/orders");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getUserOrders(currentPage, 10);
    }
  }, [isAuthenticated, currentPage]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusClass = (status: string) => {
    return (
      styles[
        `status${
          status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        }`
      ] || styles.statusDefault
    );
  };

  return (
    <div className={styles.orders}>
      <div className={styles.container}>
        <div className={styles.orderHeader}>
          <h1 className={styles.title}>My orders</h1>
          <button
            onClick={() => router.push("/user")}
            className={styles.backButton}
          >
            Back to Dashboard
          </button>
        </div>

        {isLoading ? (
          <p className={styles.loading}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className={styles.empty}>
            <p>No orders found</p>
          </div>
        ) : (
          <>
            <div className={styles.ordersList}>
              {orders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div className={styles.orderInfo}>
                      <h3 className={styles.orderId}>
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <p className={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`${styles.status} ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className={styles.orderItems}>
                    {order.items.map((item: OrderItemDetail) => (
                      <div key={item.id} className={styles.orderItem}>
                        <div className={styles.itemInfo}>
                          <p className={styles.itemName}>{item.productName}</p>
                          <p className={styles.itemQuantity}>
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className={styles.itemPrice}>
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={styles.orderFooter}>
                    <div className={styles.shippingAddress}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{order.shippingAddress}</span>
                    </div>
                    <p className={styles.orderTotal}>
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>
                <div className={styles.paginationInfo}>
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
