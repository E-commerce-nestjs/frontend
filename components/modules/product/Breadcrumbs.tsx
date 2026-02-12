"use client"

import Link from "next/link"
import styles from "./breadcrumbs.module.scss"

interface BreadcrumbsProps {
  productName: string
}

export function Breadcrumbs({ productName }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Store
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{productName}</span>
        </nav>
      </div>
    </div>
  )
}
