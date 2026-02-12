import Link from "next/link"
import styles from "./footer.module.scss"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>STOREFRONT</h3>
            <p>Your premier destination for quality products. We curate the finest selection to meet your needs.</p>
          </div>

          <div className={styles.section}>
            <h4>Shop</h4>
            <ul>
              <li>
                <Link href="/">All Products</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/deals">Deals</Link>
              </li>
              <li>
                <Link href="/new-arrivals">New Arrivals</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Support</h4>
            <ul>
              <li>
                <Link href="/help">Help Center</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/shipping">Shipping Info</Link>
              </li>
              <li>
                <Link href="/returns">Returns</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Storefront. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
