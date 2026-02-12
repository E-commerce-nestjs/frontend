"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import styles from "./header.module.scss";
import { LayoutDashboard } from "lucide-react";

export function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { isAuthenticated, logout, isLoading, user } = useAuth();

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const handleDashboardClick = () => {
    console.log(user);
    if (user && user.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  };

  const handleLogoutClick = async () => {
    await logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          STOREFRONT
        </Link>
        <div className={styles.actions}>
          <Link href="/cart" className={styles.cartButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <LayoutDashboard onClick={handleDashboardClick}></LayoutDashboard>
              <button
                onClick={handleLogoutClick}
                className={styles.logoutButton}
                disabled={isLoading}
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <button onClick={handleLoginClick} className={styles.loginButton}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
