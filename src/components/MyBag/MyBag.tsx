import type { Ref } from 'react'
import closeIcon from '../../assets/icons/close.svg'
import { formatPrice } from '../../features/cart'
import type { CartLine } from '../../features/cart'
import { Button } from '../Button/Button'
import interaction from '../../styles/interaction.module.css'
import styles from './MyBag.module.css'

type MyBagProps = {
  id: string
  lines: CartLine[]
  subtotalCents: number
  onClose: () => void
  /** Called when one of the links is followed (a link to the same page does not unmount the bag). */
  onNavigate: () => void
  /** The close button receives focus when the bag opens. */
  closeRef?: Ref<HTMLButtonElement>
  checkoutHref: string
  shopHref: string
}

/** Read-only summary of the cart ("My Bag"). Quantities are changed on the check out page. */
export function MyBag({ id, lines, subtotalCents, onClose, onNavigate, closeRef, checkoutHref, shopHref }: MyBagProps) {
  const titleId = `${id}-title`

  return (
    <section id={id} role="dialog" aria-modal="false" aria-labelledby={titleId} className={styles.bag}>
      <div className={styles.head}>
        <h2 id={titleId} className={styles.title}>
          My Bag
        </h2>
        <button ref={closeRef} type="button" className={`${styles.close} ${interaction.iconButton}`} aria-label="Close My Bag" onClick={onClose}>
          <img src={closeIcon} alt="" width={17} height={17} />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Your bag is empty</p>
          <Button href={shopHref} onClick={onNavigate}>Shop cupcakes</Button>
        </div>
      ) : (
        <>
          <ul className={styles.lines}>
            {lines.map((line) => (
              <li key={line.id} className={styles.line}>
                <span className={styles.thumb}>
                  <img src={line.image} alt="" width={line.imageWidth} height={line.imageHeight} className={styles.thumbImage} />
                </span>
                <p className={styles.name}>
                  {line.name} x {line.qty}
                </p>
                <p className={styles.price}>{formatPrice(line.totalCents)}</p>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <p className={styles.totalLabel}>Total to pay</p>
            <p className={styles.totalPrice}>{formatPrice(subtotalCents)}</p>
          </div>
          <div className={styles.actions}>
            <Button href={checkoutHref} fullWidth className={styles.checkout} onClick={onNavigate}>
              Check out
            </Button>
            <Button href={checkoutHref} variant="text" className={styles.viewCart} onClick={onNavigate}>
              View cart
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
