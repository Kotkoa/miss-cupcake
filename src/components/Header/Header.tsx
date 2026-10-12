import { useId, useRef, useState } from 'react'
import cartIcon from '../../assets/icons/cart.svg'
import cartBadge from '../../assets/icons/cart-badge.svg'
import menuIcon from '../../assets/icons/menu.svg'
import styles from './Header.module.css'

export type NavLink = {
  label: string
  href: string
  /** Marks the page the user is on (Lato Black in Figma). */
  current?: boolean
}

type HeaderProps = {
  navLinks: NavLink[]
  cartCount: number
  cartHref: string
}

export function Header({ navLinks, cartCount, cartHref }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const cartLabel = cartCount > 0 ? `Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : 'Cart, empty'

  return (
    <header className={styles.header} onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false)
          menuButtonRef.current?.focus() // the focused link is about to be hidden
        }
      }}
    >
      <button
        ref={menuButtonRef}
        type="button"
        className={styles.menuButton}
        aria-label="Menu"
        aria-expanded={menuOpen}
        aria-controls={navId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img src={menuIcon} alt="" width={30} height={18} />
      </button>
      <nav id={navId} aria-label="Main" className={menuOpen ? styles.navOpen : styles.nav}>
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={link.current ? styles.current : styles.link}
                aria-current={link.current ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a href={cartHref} className={styles.cart} aria-label={cartLabel}>
        <img src={cartIcon} alt="" width={39} height={40} className={styles.cartIcon} />
        {cartCount > 0 ? (
          <span className={styles.badge} aria-hidden="true">
            <img src={cartBadge} alt="" width={26} height={26} className={styles.badgeCircle} />
            <span className={styles.count}>{cartCount}</span>
          </span>
        ) : null}
      </a>
    </header>
  )
}
